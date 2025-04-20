
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Store in Supabase - ensure data matches the expected schema
      const { error: dbError } = await supabase
        .from('contacts')
        .insert({
          name: data.name,
          email: data.email,
          message: data.message
        });

      if (dbError) throw dbError;

      // Send confirmation email
      const response = await fetch('https://flluxylfscixfeyonxsf.supabase.co/functions/v1/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.auth.getSession()}`
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      toast({
        title: 'Message Sent!',
        description: 'We\'ve received your message and will get back to you soon.',
      });
      
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="How can we help you?"
                  className="min-h-32 resize-none"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Tell us about your inquiry or how we can assist you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full sm:w-auto bg-dhara-blue hover:bg-dhara-blue/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Send size={16} className="ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
