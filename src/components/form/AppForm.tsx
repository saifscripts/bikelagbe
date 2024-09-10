import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ZodSchema } from 'zod';

import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AppFormProps {
  schema?: ZodSchema;
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Record<string, any> | undefined;
}

export default function AppForm({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
}: AppFormProps) {
  const form = useForm({
    resolver: schema && zodResolver(schema),
    defaultValues,
  });

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    const shouldReset = await onSubmit(data);

    if (shouldReset) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className={cn('w-full space-y-6', className)}
      >
        {children}
      </form>
    </Form>
  );
}
