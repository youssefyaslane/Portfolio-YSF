import type { Experience } from './types'

export const experiences: Experience[] = [
  {
    id: 'netis-group',
    company: 'Netis Group',
    role: 'Stage - Data Engineer',
    period: '06/2026 – Présent',
    missions: [
      'En charge d\'un pipeline de supervision sécurité : ingestion de 2 APIs Sophos via Airbyte, orchestration Airflow, transformations dbt et dashboard Power BI pour l\'équipe Sécurité.',
      'En charge de la gouvernance et de la qualité des données avec OpenMetadata (catalogage, lineage, contrôles de qualité).',
    ],
    techStack: ['Airflow', 'Airbyte', 'dbt', 'OpenMetadata', 'PostgreSQL', 'Power BI', 'Python', 'SQL'],
  },
  {
    id: 'sothema',
    company: 'Sothema',
    role: 'Stage - Data Engineer',
    period: '01/2026 – Présent',
    missions: [
      "Mise en place d'un pipeline data end-to-end avec Microsoft Fabric pour alimenter des dashboards Power BI.",
      "Conception d'une solution IA pour l'analyse avancée des données et l'aide à la décision.",
    ],
    techStack: ['Microsoft Fabric', 'Synapse Data Science', 'Synapse Data Engineering', 'Synapse Real-Time', 'Power BI'],
  },
  {
    id: 'electroplanet',
    company: 'Electroplanet',
    role: 'Stage - Data Analyst',
    period: '01/2026 – 03/2026',
    missions: [
      "Modélisation de données commerciales en schéma étoile pour l'analyse du chiffre d'affaires et du budget.",
      'Analyse Réel vs Budget par type, famille et commercial ; développement de mesures DAX et dashboards Power BI.',
      'Optimisation du modèle et des performances des rapports.',
    ],
    techStack: ['Power BI', 'DAX', 'Power Query', 'SQL', 'Excel', 'MySQL'],
  },
  {
    id: 'orange-maroc',
    company: 'Orange Maroc',
    role: 'Stage - AI Engineer',
    period: '02/2025 – 09/2025',
    missions: [
      "Contribution à une plateforme IA multi-agents pour l'analyse de la voix client et l'automatisation CRM.",
      'Pipeline de transcription, analyse sémantique, stockage vectoriel et suivi KPI sur Power BI.',
    ],
    techStack: ['Python', 'LangGraph', 'LangChain', 'LLM', 'NLP', 'MongoDB', 'Docker', 'Power BI'],
  },
  {
    id: 'inwi',
    company: 'Inwi',
    role: 'Stage - Data Engineer',
    period: '06/2024 – 07/2024',
    missions: [
      "Mise en place d'un pipeline temps réel avec Kafka et Spark pour des usages analytiques.",
      'Transformation de données volumineuses et production de rapports de suivi.',
    ],
    techStack: ['Kafka', 'Spark', 'Hadoop', 'HDFS', 'SQL', 'Superset', 'Power BI'],
  },
  {
    id: 'timar',
    company: 'TIMAR',
    role: 'Stage - AI Engineer',
    period: '05/2024 – 06/2024',
    missions: [
      "Développement d'un chatbot IA pour l'automatisation des requêtes logistiques.",
      'Fine-tuning BERT, API Flask et amélioration de la compréhension contextuelle.',
    ],
    techStack: ['Python', 'BERT', 'NLP', 'Flask', 'SQL', 'Excel'],
  },
  {
    id: 'marsa-maroc',
    company: 'Marsa Maroc',
    role: 'Stage - Data Scientist',
    period: '08/2023 – 09/2023',
    missions: [
      'Développement d\'un système prédictif de rétention des talents à partir de données RH.',
      'Feature engineering, préparation des données, entraînement et interface de suivi.',
    ],
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Machine Learning', 'Flask'],
  },
]
