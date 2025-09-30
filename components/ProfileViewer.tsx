import React from 'react'
import { UserProfile } from '@/types/UserProfile';
const ProfileViewer = ({profile}: {profile: UserProfile}) => {
    const softSkills: string[] = profile.softSkills
    .split(",")
    .map((a) => a.trim())
    .filter((s) => s !== "");
  const hardSkills: string[] = profile.hardSkills
    .split(",")
    .map((a) => a.trim())
    .filter((s) => s !== "");
  const languages: string[] = profile.languages
    .split(",")
    .map((a) => a.trim())
    .filter((s) => s !== "");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold">
          {profile.name}
        </p>
      </div>
      <p>
        <strong>Descripción: </strong> {profile.shortDescription}
      </p>
      <p>
        <strong>Telefono: </strong> {profile.phone}
      </p>
      <p>
        <strong>Mail: </strong> {profile.mail}
      </p>
      <p>
        <strong>Lenguajes: </strong>
        <ul>
          {languages.map((a) => (
            <li key={a}>- {a}</li>
          ))}
        </ul>
      </p>
      <p>
        <strong>Habilidades blandas: </strong>
        <ul>
          {softSkills.map((a) => (
            <li key={a}>- {a}</li>
          ))}
        </ul>
      </p>
      <p>
        <strong>Habilidades duras: </strong>
        <ul>
          {hardSkills.map((a) => (
            <li key={a}>- {a}</li>
          ))}
        </ul>
      </p>

      <div>
        <strong>Experiencia laboral: </strong>
        <ul className="list-disc ml-5 max-w-2xl">
          {profile.experience.map((exp, i) => (
            <>
              <li key={i} className="mb-2">
                {exp.role} en {exp.company} ({exp.duration})
              </li>
              <div className="whitespace-pre-line break-words text-sm opacity-80">
                {exp.description}
              </div>
            </>
          ))}
        </ul>
      </div>

      <div>
        <strong>Educación: </strong>
        <ul className="list-disc ml-5">
          {profile.education.map((edu, i) => (
            <li key={i}>
              {edu.degree} - {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  )
}

export default ProfileViewer