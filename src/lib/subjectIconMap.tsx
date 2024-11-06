import { ReactNode } from "react";
import { Subject, TGrade } from "./types";

import { Calculator, Sigma, Radius, BookOpen, Globe, Microscope, Orbit, Atom, Tangent, Omega, Telescope, FlaskConical, FileClock, BookOpenCheck, BookOpenText, NotebookPen, BookA, BookType, BookUser, Palette, Music, Landmark, Scale, Computer, TrafficCone, Pickaxe } from "lucide-react";
import subjectsData from "@/data/subjects";
import { ISubject } from "./types";

const ICON_MAP: { [key in Subject]: ReactNode } = {
    // Maths
    [Subject.Mathematics]: <Calculator />,
    [Subject.Algebra]: <Sigma />,
    [Subject.Geometry]: <Radius />,
    [Subject.PreCalculus]: <Calculator />,
    [Subject.Calculus]: <Calculator />,
    [Subject.Trigonometry]: <Tangent />,
    // Science
    [Subject.Science]: <FlaskConical />,
    [Subject.Biology]: <Microscope />,
    [Subject.Chemistry]: <Atom />,
    [Subject.Physics]: <Omega />,
    [Subject.Astronomy]: <Orbit />,
    [Subject.ComputerScience]:  <Computer />,
    // Languages
    [Subject.English]: <BookOpenCheck />,
    [Subject.Literature]: <BookOpenText />,
    [Subject.KyrgyzLanguage]: <NotebookPen />,
    [Subject.KyrgyzLiterature]: <BookA />,
    [Subject.RussianLanguage]: <BookA />,
    [Subject.RussianLiterature]: <BookType />,
    // Social
    [Subject.History]: <FileClock />,
    [Subject.WorldHistory]: <FileClock />,
    [Subject.HistoryOfKyrgyzstan]: <FileClock />,

    [Subject.Geography]: <Globe />,
    [Subject.Economics]:  < Landmark/>,

    [Subject.SocialStudies]: <BookUser />,
    [Subject.LifeSafetyBasics]: <TrafficCone />,
    [Subject.LaborStudies] : <Pickaxe />,
    [Subject.GovernmentAndLaw] : <Scale />,

    [Subject.Arts]: <Palette />,
    [Subject.Music]: <Music />,
};

export default function getSubjectIcon (subject: Subject): ReactNode {
    return ICON_MAP[subject] || <BookOpen />
}

export const getSubjectsByGrade = (subjects: ISubject[]) => {
    let subByGrade: {[key in TGrade]: ISubject[]} = {
        2: [],
        1: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: []
    };

    subjects.forEach((sub, index)=> {
        if(sub.grade in subByGrade){
            subByGrade[sub.grade].push(sub);
        } else {
            subByGrade[sub.grade] = [sub];
        }
    })

    return subByGrade;
}