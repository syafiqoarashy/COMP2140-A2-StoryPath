'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import {useState} from "react";

const FormSchema = z.object({
    location_name: z.string().min(2, {
        message: "Location name must be at least 2 characters.",
    }),
    location_trigger: z.enum(["Location Entry", "QR Code Scan", "Both Location Entry and QR Code Scan"]),
    location_position: z.string().regex(/^\(-?\d+(\.\d+)?,-?\d+(\.\d+)?\)$/, {
        message: "Invalid location format. Use (latitude,longitude)",
    }),
    location_content: z.string().optional(),
    clue: z.string().optional(),
    score_points: z.number().int().nonnegative(),
})

export function LocationForm({ location, onSubmit }) {
    const [editorContent, setEditorContent] = useState(location?.location_content || '')

    const methods = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: location || {
            location_name: "",
            location_trigger: "Location Entry",
            location_position: "",
            location_content: "",
            clue: "",
            score_points: 0,
        },
    })

    const handleSubmit = (data) => {
        console.log("Editor Content,", editorContent);
        onSubmit({...data, location_content: editorContent});
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={methods.control}
                    name="location_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="location_trigger"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location Trigger</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select trigger type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Location Entry">Location Entry</SelectItem>
                                    <SelectItem value="QR Code Scan">QR Code Scan</SelectItem>
                                    <SelectItem value="Both Location Entry and QR Code Scan">Both Location Entry and QR Code Scan</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="location_position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location Position</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="(latitude,longitude)" />
                            </FormControl>
                            <FormDescription>Enter coordinates in the format (latitude,longitude)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="location_content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location Content</FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    value={editorContent}
                                    onChange={setEditorContent}
                                    modules={modules}
                                    formats={formats}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="clue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clue</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="score_points"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Score Points</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    )
}