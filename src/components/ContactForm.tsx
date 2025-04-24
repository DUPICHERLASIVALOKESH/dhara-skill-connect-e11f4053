
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
  phone_number: z.string().min(10, {
    message: 'Please enter a valid phone number.',
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
      phone_number: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Store in Supabase
      const { error: dbError } = await supabase
        .from('contacts')
        .insert({
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          message: data.message
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      console.log('Contact data stored successfully');
      
      // Send confirmation email with improved error handling
      try {
        // Get auth token for calling the edge function
        const { data: authData } = await supabase.auth.getSession();
        
        // Clear API key tracking from URL if present to prevent CORS issues
        const functionURL = 'https://flluxylfscixfeyonxsf.supabase.co/functions/v1/send-confirmation';
        
        const response = await fetch(functionURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.session?.access_token || ''}`,
            // Use the constant from the client file instead of accessing protected property
            'apikey': process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbHV4eWxmc2NpeGZleW9ueHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMzcxNzYsImV4cCI6MjA2MDcxMzE3Nn0.e50WWaRU7Pmwgycf1Xnk4FMweqJKJ4MTFCht8qquCEc',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            phone_number: data.phone_number
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Edge function error response:', errorData);
          throw new Error(`Failed to send confirmation email: ${errorData.error || response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Email function response:', responseData);

        // Special handling for Resend test mode limitations
        if (responseData.emailError) {
          console.log('Email sending limitation:', responseData.emailError);
          toast({
            title: 'Message Received!',
            description: 'Your information has been stored successfully. However, in test mode, confirmation emails can only be sent to verified email addresses.',
          });
        } else {
          toast({
            title: 'Message Sent!',
            description: 'We\'ve received your message and will get back to you soon.',
          });
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Even if email fails, we've stored the contact info
        toast({
          title: 'Message Received',
          description: 'Your information has been stored, but there was a problem sending the confirmation email. Our team will contact you soon.',
        });
      }
      
      form.reset();
    } catch (error) {
      console.error('Error during form submission:', error);
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
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" type="tel" {...field} />
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
