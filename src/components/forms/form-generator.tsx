import React from "react";
import { Button } from "@/components/ui/button";

type FormField = {
    type: "text" | "email" | "password" | "file" | "number";
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
};

type FormGeneratorProps = {
    fields: FormField[];
    onSubmit: (formData: Record<string, string>) => void;
    submitButtonText?: string;
    className?: string;
};

const FormGenerator = ({
                           fields,
                           onSubmit,
                           submitButtonText = "Submit",
                           className,
                       }: FormGeneratorProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        fields.forEach((field) => {
            data[field.name] = formData.get(field.name) as string;
        });

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        {field.label}
                    </label>
                    {field.type === "file" ? (
                        <input
                            type="file"
                            name={field.name}
                            className="w-full p-2 border rounded"
                            required={field.required}
                        />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            className="w-full p-2 border rounded"
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <Button type="submit">{submitButtonText}</Button>
        </form>
    );
};

export default FormGenerator;