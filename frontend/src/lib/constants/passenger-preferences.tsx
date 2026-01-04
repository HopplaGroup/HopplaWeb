import {
  Dog,
  CigaretteOff,
  Luggage,
  Music,
  Volume,
  Snowflake,
  Clock,
  GraduationCap,
} from "lucide-react";
import { ReactNode } from "react";

export type PassengerPreference = {
  id: string;
  icon: ReactNode;
  en: string;
  ka: string;
};

export const PASSENGER_PREFERENCES: PassengerPreference[] = [
  {
    id: "with-pet",
    icon: <Dog className="size-5" />,
    en: "Traveling with a pet",
    ka: "შინაურ ცხოველთან ერთად",
  },
  {
    id: "no-smoking",
    icon: <CigaretteOff className="size-5" />,
    en: "No smoking",
    ka: "არ ვეწევით",
  },
  {
    id: "with-luggage",
    icon: <Luggage className="size-5" />,
    en: "Have luggage",
    ka: "მაქვს ბარგი",
  },
  {
    id: "music-ok",
    icon: <Music className="size-5" />,
    en: "Music is welcome",
    ka: "მუსიკა შეიძლება",
  },
  {
    id: "quiet-ride",
    icon: <Volume className="size-5" />,
    en: "Prefer quiet ride",
    ka: "მშვიდ მგზავრობას ვამჯობინებ",
  },
  {
    id: "ac-needed",
    icon: <Snowflake className="size-5" />,
    en: "Air conditioning needed",
    ka: "კონდიციონერი სჭირდება",
  },
  {
    id: "flexible-time",
    icon: <Clock className="size-5" />,
    en: "Flexible on time",
    ka: "დრო მოქნილია",
  },
  {
    id: "student",
    icon: <GraduationCap className="size-5" />,
    en: "Student",
    ka: "სტუდენტი",
  },
];

