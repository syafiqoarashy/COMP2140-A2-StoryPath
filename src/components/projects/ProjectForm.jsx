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

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  instructions: z.string().optional(),
  initial_clue: z.string().optional(),
  homescreen_display: z.enum(["Description", "Instructions", "Initial Clue"]),
  is_published: z.boolean(),
  participant_scoring: z.enum(["Not Scored", "Number of Scanned QR Codes", "Number of Locations Entered"]),
})

export function ProjectForm({ project, onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: project || {
      title: "",
      description: "",
      instructions: "",
      initial_clue: "",
      homescreen_display: "Description",
      is_published: false,
      participant_scoring: "Not Scored",
    },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={methods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
                  <SelectItem value="Description">Description</SelectItem>
                  <SelectItem value="Instructions">Instructions</SelectItem>
                    <SelectItem value="Initial Clue">Initial Clue</SelectItem>
                </SelectContent>
              </Select>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}