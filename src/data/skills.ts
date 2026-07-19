import type { SkillCategory } from './types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'bi',
    label: 'Data Analysis & BI',
    skills: ['Power BI', 'DAX', 'Power Query', 'Excel', 'KPI', 'Data Visualization', 'Reporting'],
  },
  { id: 'languages', label: 'Langages', skills: ['Python', 'SQL'] },
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    skills: ['ETL', 'Apache Spark', 'Kafka', 'Hadoop', 'HDFS', 'BigQuery', 'Microsoft Fabric'],
  },
  {
    id: 'ml-ai',
    label: 'Machine Learning & IA',
    skills: ['Scikit-learn', 'TensorFlow', 'NLP', 'LLM', 'LangChain', 'LangGraph', 'RAG'],
  },
  {
    id: 'databases',
    label: 'Bases de données',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQL Server'],
  },
  { id: 'tools', label: 'Outils', skills: ['Git', 'Docker', 'Flask', 'FastAPI', 'MLflow'] },
]
