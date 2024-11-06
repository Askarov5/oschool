// constants.ts
enum Subject {
    //Science
    Mathematics = 'Mathematics',
    Algebra = 'Algebra',
    Geometry= 'Geometry',
    Science = 'Science',
    Biology = 'Biology',
    Chemistry = 'Chemistry',
    PreCalculus = 'Pre-Calculus',
    Calculus = 'Calculus',
    Informatics = 'Informatics',
    Physics = 'Physics',
    Astronomy = 'Astronomy',

    // Languages
    English = 'English',
    Literature = 'Literature',
    KyrgyzLanguage= 'Kyrgyz Language',
    KyrgyzLiterature = 'Kyrgyz Literature',
    RussianLanguage= 'Russian Language',
    RussianLiterature = 'Russian Literature',
    
    // Social Studies
    WorldHistory = 'World History',
    History = 'History',
    HistoryOfKyrgyzstan = 'History of Kyrgyzstan',

    Geography = 'Geography',

    SocialStudies = 'Social Studies',
    Arts = 'Arts',
    
    Economy = 'Economy',
    GovernmentAndLaw = 'Government and Law',
}

export interface ISubject {
    id: string;
    title: string;
    description: string;
    grade: number;
    chapters: string[];
}

export const GRADE_SUBJECT_MAP: { [key: string]: Subject[] } = {
    '1': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts
    ],
    '2': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts
    ],
    '3': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts
    ],
    '4': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts,
        Subject.Geography
    ],
    '5': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts,
        Subject.Geography
    ],
    '6': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts,
        Subject.Geography,
        Subject.HistoryOfKyrgyzstan
    ],
    '7': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts,
        Subject.Geography,
        Subject.HistoryOfKyrgyzstan
    ],
    '8': [
        Subject.Mathematics,
        Subject.Science,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Arts,
        Subject.Geography,
        Subject.History,
        Subject.WorldHistory
    ],
    '9': [
        Subject.Algebra,
        Subject.Biology,
        Subject.English,
        Subject.Literature,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Geography,
        Subject.History,
        Subject.WorldHistory
    ],
    '10': [
        Subject.Geometry,
        Subject.Chemistry,
        Subject.English,
        Subject.Literature,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Geography,
        Subject.History,
        Subject.WorldHistory,
        Subject.Economy
    ],
    '11': [
        Subject.PreCalculus,
        Subject.Physics,
        Subject.English,
        Subject.Literature,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Geography,
        Subject.History,
        Subject.WorldHistory,
        Subject.Economy,
        Subject.GovernmentAndLaw
    ],
    '12': [
        Subject.Calculus,
        Subject.Physics,
        Subject.English,
        Subject.Literature,
        Subject.KyrgyzLanguage,
        Subject.KyrgyzLiterature,
        Subject.RussianLanguage,
        Subject.RussianLiterature,
        Subject.SocialStudies,
        Subject.Geography,
        Subject.History,
        Subject.WorldHistory,
        Subject.Economy,
        Subject.GovernmentAndLaw,
        Subject.Astronomy,
        Subject.Informatics
    ],
};
