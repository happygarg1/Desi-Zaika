import { Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Himani Garg. All rights reserved.</p>
        
        <div className="flex gap-6">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-300"
          >
            <Mail className="w-5 h-5" />
            himanigarg998@gmail.com
          </a>

          <a
            href="https://www.linkedin.com/in/himani-garg-551937255"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-300"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
