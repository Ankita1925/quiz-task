
export interface Quiz {
  id: number;
  name: string | null;
  title: string;
  description: string;
  difficulty_level: string | number | null;
  topic: string;
  time: string; // ISO date format
  is_published: boolean;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  duration: number;
  end_time: string; // ISO date format
  negative_marks: string; // Change to number if needed
  correct_answer_marks: string; // Change to number if needed
  shuffle: boolean;
  show_answers: boolean;
  lock_solutions: boolean;
  is_form: boolean;
  show_mastery_option: boolean;
  reading_material: string | null;
  quiz_type: string | null;
  is_custom: boolean;
  banner_id: number | string | null;
  exam_id: number | string | null;
  show_unanswered: boolean;
  ends_at: string; // Date format
  lives: number | null;
  live_count: string;
  coin_count: number;
  questions_count: number;
  daily_date: string;
  max_mistake_count: number;
  reading_materials: string[];
  questions: Question[];
}

export interface Question {
  id: number;
  description: string;
  difficulty_level: string | number | null;
  topic: string;
  is_published: boolean;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  detailed_solution: string;
  type: string;
  is_mandatory: boolean;
  show_in_feed: boolean;
  pyq_label: string;
  topic_id: number;
  reading_material_id: number | null;
  fixed_at: string; // ISO date format
  fix_summary: string;
  created_by: string | null;
  updated_by: string | null;
  quiz_level: string | number | null;
  question_from: string;
  language: string | null;
  photo_url: string | null;
  photo_solution_url: string | null;
  is_saved: boolean;
  tag: string;
  options: Option[];
  reading_material: ReadingMaterial;
}

export interface Option {
  id: number;
  description: string;
  question_id: number;
  is_correct: boolean;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  unanswered: boolean;
  photo_url: string | null;
}

export interface ReadingMaterial {
  id: number;
  keywords: string; // JSON-encoded array
  content: string | null;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  content_sections: string[];
  practice_material:{
    content:string[]
  }
}
