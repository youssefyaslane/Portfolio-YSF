import type { Project } from './types'

// demoUrl left undefined across the board — none of these repos expose a
// live demo/homepage on GitHub. Descriptions are drawn from the CV (first
// two entries) or from each repo's actual README (the rest) — nothing
// here is invented.
export const projects: Project[] = [
  {
    id: 'urban-incidents-pipeline',
    title: "Pipeline End-to-End de prédiction d'incidents urbains en temps réel",
    description:
      'Architecture data pour prédire les zones à risque : pipeline streaming Kafka/Spark, stockage HDFS/BigQuery, dashboard Power BI.',
    techStack: ['Kafka', 'Spark', 'Python', 'HDFS', 'BigQuery', 'Machine Learning', 'Power BI'],
    githubUrl: 'https://github.com/youssefyaslane/Real-Time-Urban-Incident-Prediction-Pipeline',
  },
  {
    id: 'university-rag-chatbot',
    title: 'Chatbot universitaire intelligent avec architecture RAG',
    description:
      "Chatbot pour automatiser les réponses aux étudiants avec architecture RAG, interface front-end et back-end d'orchestration.",
    techStack: ['Python', 'LangChain', 'RAG', 'React', 'Flask', 'Llama 3', 'Ollama', 'Vector Database'],
    githubUrl: 'https://github.com/youssefyaslane/chatbotUIC_Rag_V2',
  },
  {
    id: 'projet-multiagents',
    title: 'Analyse automatique des appels clients (multi-agents)',
    description:
      "Architecture multi-agent orchestrée avec LangGraph : transcription → analyse → rapport → envoi de SMS, pour automatiser le traitement des appels clients.",
    techStack: ['Python', 'LangGraph', 'Multi-agent'],
    githubUrl: 'https://github.com/youssefyaslane/PROJET_MULTIAGENTS',
  },
  {
    id: 'pipeline-hr',
    title: 'Pipeline HR end-to-end (CSV → Airflow → dbt → PostgreSQL)',
    description:
      "Ingestion d'un dataset RH (311 employés), transformation en entrepôt en schéma étoile avec dbt, orchestré par Apache Airflow et conteneurisé avec Docker.",
    techStack: ['Airflow', 'dbt', 'PostgreSQL', 'Docker', 'Python'],
    githubUrl: 'https://github.com/youssefyaslane/Pipeline-end-to-end-HR',
  },
  {
    id: 'workflow-llm-analysis',
    title: 'Data Analysis Agent (workflow Flask + LangGraph)',
    description:
      'Application Flask pour analyser un CSV via un workflow LangGraph à étapes fixes (statistiques, corrélations, insights générés par LLM) affiché dans le navigateur.',
    techStack: ['Python', 'Flask', 'LangGraph', 'Pandas'],
    githubUrl: 'https://github.com/youssefyaslane/worflow_LLM_analysis',
  },
  {
    id: 'analyses-news',
    title: "FT Daily Pipeline — scraping et analyse d'articles",
    description:
      'Pipeline de scraping (SeleniumBase) et de stockage MongoDB pour des articles du Financial Times, avec analyse par LLM.',
    techStack: ['Python', 'MongoDB', 'SeleniumBase', 'LLM'],
    githubUrl: 'https://github.com/youssefyaslane/analyses_news',
  },
  {
    id: 'data-analysis-agent',
    title: 'Data Analysis Agent (LangChain Deep Agent)',
    description:
      "Agent LangChain qui analyse un fichier CSV et produit un rapport d'insights et une visualisation, avec partage optionnel sur Slack.",
    techStack: ['Python', 'LangChain', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/youssefyaslane/data-analysis-agent',
  },
  {
    id: 'mlops-churn',
    title: 'MLOps End-to-End — Prédiction du churn client (Télécom)',
    description:
      'Pipeline MLOps complet pour la prédiction du churn : tracking MLflow, orchestration Airflow, API FastAPI et conteneurisation Docker.',
    techStack: ['MLflow', 'Airflow', 'Docker', 'FastAPI', 'Python'],
    githubUrl: 'https://github.com/youssefyaslane/MLOPS_END_END',
  },
  {
    id: 'car-price-prediction',
    title: "Prédiction du prix de voitures d'occasion",
    description:
      "Modèle de machine learning pour estimer le prix d'une voiture d'occasion à partir de ses caractéristiques, pour aider acheteurs et vendeurs lors de la négociation.",
    techStack: ['Python', 'Machine Learning'],
    githubUrl: 'https://github.com/youssefyaslane/Machine-learning-Cars-Predicting',
  },
  {
    id: 'inwi-sentiment',
    title: 'Analyse de sentiment des tweets Inwi',
    description:
      "Collecte, stockage et analyse de sentiment (dont un modèle BERT) des tweets mentionnant l'opérateur télécom Inwi.",
    techStack: ['Python', 'BERT', 'NLP'],
    githubUrl: 'https://github.com/youssefyaslane/analyse-inwi-sentiment',
  },
  {
    id: 'smart-factory-segmentation',
    title: 'Segmentation médicale par deep learning — 3D Smart Factory',
    description:
      "Plateforme web Flask intégrant un modèle de deep learning pour la segmentation automatique d'images médicales (IRM, scanner), réalisée dans le cadre d'un stage.",
    techStack: ['Python', 'Deep Learning', 'Flask'],
    githubUrl: 'https://github.com/youssefyaslane/PFA_3D_smart_factory',
  },
]
