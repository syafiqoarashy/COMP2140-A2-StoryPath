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
import { Checkbox } from "@/components/ui/checkbox"

/**
 * Validation schema for the project form using Zod.
 * @type {import('zod').ZodObject}
 */
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  instructions: z.string().optional(),
  initial_clue: z.string().optional(),
    homescreen_display: z.enum(["Display initial clue", "Display all locations", "Display map"]),
  is_published: z.boolean(),
  participant_scoring: z.enum(["Not Scored", "Number of Scanned QR Codes", "Number of Locations Entered"]),
})

/**
 * ProjectForm component for creating or editing a project.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.project - The project data to populate the form.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 */
export function ProjectForm({ project, onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: project || {
      title: "",
      description: "",
      instructions: "",
      initial_clue: "",
      homescreen_display: "Display initial clue",
      is_published: false,
      participant_scoring: "Not Scored",
    },
  })

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-2xl font-bold">Edit Project</h2>

                <FormField
                    control={methods.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>The name of your project.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription>Provide a brief description of your project. This is not displayed to participants.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription>Instructions for participants, explaining how to engage with the project.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="initial_clue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Initial Clue</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>The first clue to start the project. This is optional.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="homescreen_display"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Homescreen Display</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select homescreen display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Display initial clue">Display Initial Clue</SelectItem>
                                    <SelectItem value="Display all locations">Display All Locations</SelectItem>
                                    <SelectItem value="Display map">Display Map</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>Choose what to display on the homescreen of the project.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="participant_scoring"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Participant Scoring</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select participant scoring" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Not Scored">Not Scored</SelectItem>
                                    <SelectItem value="Number of Scanned QR Codes">Number of Scanned QR Codes</SelectItem>
                                    <SelectItem value="Number of Locations Entered">Number of Locations Entered</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>Select how participants will be scored in this project.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="is_published"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Published
                                </FormLabel>
                                <FormDescription>
                                    This project will be visible to participants
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit">Save Project</Button>
            </form>
        </FormProvider>
    )
}