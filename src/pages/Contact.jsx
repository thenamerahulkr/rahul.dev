import { Helmet } from 'react-helmet-async'
import { Linkedin, Github, Twitter, Facebook, BookOpen, Code2, Send, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Rahul Kumar</title>
        <meta 
          name="description" 
          content="Get in touch with Rahul Kumar. Let's discuss your project or just say hello!" 
        />
        <meta property="og:title" content="Contact | Rahul Kumar" />
        <meta property="og:description" content="Get in touch with Rahul Kumar" />
      </Helmet>

      <div className="pt-20">
        <section className="container-custom section-spacing">
          <h1 className="heading-xl mb-16 relative text-center">
            Get In Touch
            <span className="absolute -z-10 text-[10rem] font-bold text-muted/20 -top-20 left-1/2 -translate-x-1/2 opacity-80">
              06
            </span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-2xl leading-relaxed mb-10">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
                Whether you have a question, want to discuss a project, or just say hello, I'd love to hear from you.
              </p>
              
              <div className="flex flex-col gap-6">
                <a 
                  href="https://www.linkedin.com/in/thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">linkedin</span>
                </a>
                
                <a 
                  href="https://github.com/thenamerahulkr/thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">github</span>
                </a>
                
                <a 
                  href="https://twitter.com/thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">twitter</span>
                </a>
                
                <a 
                  href="https://wa.me/918404844101" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">WhatsApp</span>
                </a>
                
                <a 
                  href="https://t.me/thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <Send className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">Telegram</span>
                </a>
                
                <a 
                  href="https://facebook.com/thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <Facebook className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">facebook</span>
                </a>
                
                <a 
                  href="https://medium.com/@thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <BookOpen className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">Medium</span>
                </a>
                
                <a 
                  href="https://dev.to/thenamerahulkr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-xl text-muted-foreground hover:text-foreground group"
                >
                  <Code2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="link-underline">DEV</span>
                </a>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
