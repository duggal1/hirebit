"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: any;
  index: number;
  isCurrent: boolean;
}

export function QuestionCard({ question, index, isCurrent }: QuestionCardProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-6 border rounded-xl"
    >
      <div className="flex justify-between items-start cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <h3 className="flex items-center gap-3 font-semibold">
            Question {index + 1}
            <Badge variant="outline" className={cn(
              "capitalize",
              question.difficulty === 'easy' && 'bg-green-500/10 text-green-500',
              question.difficulty === 'medium' && 'bg-yellow-500/10 text-yellow-500',
              question.difficulty === 'hard' && 'bg-red-500/10 text-red-500'
            )}>
              {question.difficulty}
            </Badge>
          </h3>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      
      {open && (
        <div className="space-y-4 mt-4">
          <div className="prose-invert prose">
            <pre className="whitespace-pre-wrap">{question.question}</pre>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="mb-2 font-medium text-sm">Starter Code</h4>
            <code className="font-mono text-sm">{question.starterCode}</code>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="mb-2 font-medium text-sm">Test Cases</h4>
            <div className="gap-2 grid">
              {question.testCases.map((tc: any, i: number) => (
                <div key={i} className="flex gap-4 text-sm">
                  <span className="font-medium">Input:</span>
                  <code>{tc.input}</code>
                  <span className="font-medium">→</span>
                  <span className="font-medium">Output:</span>
                  <code>{tc.output}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}