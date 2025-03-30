'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from "@/public/logo.png";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Job Board',
      links: [
        { name: 'Browse Jobs', href: '#jobs' },
        { name: 'Post a Job', href: '#post-job' },
        { name: 'Guidelines', href: '/guidelines' },
        { name: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Security', href: '/security' },
      ],
    },
  ];

  return (
    <footer className="relative border-zinc-300 dark:border-zinc-800 bg-transparent backdrop-blur-3xl border-t">
      <div className="" />
      <div className="relative mx-auto px-6 py-16 container">
        <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
        
                <div className="">
                <Link href="/" className="">
          <Image src={Logo} alt="Logo" className="h-20 w-20" />
         
        </Link>
       

                </div>
             
              </div>
              <div className="   text-5xl text-black dark:text-white font-black">
            Hire
            <span className="text-blue-500">bit</span>
          </div>
             
            </Link>
            <p className="mt-4 max-w-md text-sm text-gray-900 dark:text-white">
              The leading job board platform connecting top talent with the best opportunities.
            </p>
          </motion.div>
          
          {footerSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="font-medium text-lg text-gray-950 dark:text-white/90">
                {section.title}
              </h3>
              <ul className="space-y-2 mt-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm text-zinc-900 dark:text-white/70 hover:text-zinc-400 dark:hover:text-white/60 transition-colors group"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="group-hover:scale-x-100 -bottom-1 absolute inset-x-0 bg-gradient-to-r from-primary/50 to-violet-500/50 h-px transform transition-transform duration-300 scale-x-0" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative border-zinc-300 dark:border-zinc-900  mt-16 pt-8 border-t"
        >
          <div className="flex md:flex-row flex-col justify-between items-center gap-6">
            <p className="text-lg text-gray-900 dark:text-white/90 hover:text-white/80 transition-colors">
              © {currentYear} Hirebit. Connecting talent with opportunities.
            </p>
            <div className="flex items-center gap-8 text-xl">
              {[
                { 
                  name: '𝕏', 
                  href: 'https://twitter.com/harshitduggal5',
                  hoverClass: 'hover:text-white' 
                },
                { 
                  name: 'GitHub', 
                  href: 'https://github.com/duggal1',
                  hoverClass: 'hover:text-white' 
                },
                { 
                  name: 'Discord', 
                  href: 'https://discord.gg',
                  hoverClass: 'hover:text-white' 
                },
              ].map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative text-zinc-950 dark:text-white/90 hover:text-white/80 transition-all duration-300 ${social.hoverClass} group`}
                  >
                    <span className="relative z-10">{social.name}</span>
                    <span className="group-hover:scale-x-100 -bottom-1 absolute inset-x-0 bg-gradient-to-r from-primary/50 to-violet-500/50 rounded-full h-[2px] transform transition-transform duration-300 scale-x-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
