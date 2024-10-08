import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';

interface AppDateTimePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

// TODO: Remove mui dependency use shadcn or custom date-time-picker to implement this
export function AppDateTimePicker({
  name,
  label,
  placeholder,
  disabled,
}: AppDateTimePickerProps) {
  const form = useFormContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Dialog>
            <DialogTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  disabled={disabled}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                  ref={triggerRef}
                >
                  {field.value ? (
                    moment(field.value).format('LLL')
                  ) : (
                    <span>{placeholder || 'Pick a date'}</span>
                  )}
                  <CalendarIcon size={16} className="ml-auto opacity-50" />
                </Button>
              </FormControl>
            </DialogTrigger>
            <DialogContent className="max-w-sm" overlay={false}>
              {/* TODO: Implement custom date-time-picker */}
              <StaticDateTimePicker
                value={moment(field.value)}
                onChange={(value) => field.onChange(value?.toDate())}
                onClose={() =>
                  (triggerRef.current as HTMLButtonElement).click()
                }
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                ampmInClock={true}
              />
            </DialogContent>
          </Dialog>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
