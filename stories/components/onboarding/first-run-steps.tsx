import { CheckboxList } from "../../../src/components/checkbox-list"
import { ChoiceCards } from "../../../src/components/choice-cards"
import { EffectsPreview } from "../../../src/components/effects-preview"
import type { FirstRunStep } from "../../../src/components/first-run"
import { InstallPrompt } from "../../../src/components/install-prompt"
import { ListField } from "../../../src/components/list-field"
import { TextField } from "../../../src/components/text-field"
import { ThemeSample } from "../../../src/components/theme-sample"
import { TiltPreview } from "../../../src/components/tilt-preview"

/** The fields of the start page's settings, shared by the wizard and the settings page of the stories. */
export const fields = {
  github: (error?: string) => <TextField label="GitHub-brukernavn" name="github" hint="Bare offentlige data vises." placeholder="octocat" autoComplete="username" verbatim defaultValue="lmfaole" {...(error === undefined ? {} : { error })} />,
  repos: () => <ListField label="Repoer du følger" name="repos" hint="Ett per linje, som eier/navn. Bare offentlige repoer, høyst 20." values={["withastro/astro", "vercel/next.js"]} placeholder="eier/navn" />,
  sections: () => (
    <CheckboxList
      name="sections"
      legend="Deler av forsiden"
      values={["weather", "transport", "github"]}
      options={[
        { value: "weather", label: "Været", description: "Akkurat nå og de neste timene." },
        { value: "transport", label: "Avganger", description: "Fra holdeplassene nær deg." },
        { value: "github", label: "GitHub", description: "Det som har skjedd i repoene du følger." },
      ]}
    />
  ),
  theme: () => (
    <ChoiceCards
      name="theme"
      legend="Tema"
      value="system"
      options={[
        { value: "system", label: "Som enheten", description: "Følger innstillingen på enheten din.", preview: <ThemeSample theme="system" size="lg" /> },
        { value: "light", label: "Lys", description: "Mørk tekst på lys bakgrunn.", preview: <ThemeSample theme="light" size="lg" /> },
        { value: "dark", label: "Mørk", description: "Lys tekst på mørk bakgrunn.", preview: <ThemeSample theme="dark" size="lg" /> },
      ]}
    />
  ),
  effects: () => (
    <ChoiceCards
      name="effects"
      legend="Effekter"
      value="on"
      options={[
        { value: "on", label: "Med effekter", description: "3D, lys og bevegelse i bilder og bakgrunner.", preview: <EffectsPreview mode="on" /> },
        { value: "off", label: "Uten effekter", description: "Flate bilder og rolige bakgrunner. Bruker mindre strøm.", preview: <EffectsPreview mode="off" /> },
      ]}
    />
  ),
  tilt: () => (
    <ChoiceCards
      name="tilt"
      legend="Lyset i bildene"
      value="off"
      options={[
        { value: "on", label: "Følg telefonen", description: "Vipp telefonen, så flytter lyset seg i bildene.", preview: <TiltPreview mode="follow" /> },
        { value: "off", label: "Fast lys", description: "Lyset står stille.", preview: <TiltPreview mode="still" /> },
      ]}
    />
  ),
}

export const steps = (errors: { github?: string } = {}): FirstRunStep[] => [
  { id: "velkommen", icon: "home", title: "Velkommen til Startside", body: "Noen få valg, så blir forsiden din. Alt kan endres senere under Innstillinger." },
  { id: "github", icon: "person", title: "Hvem er du på GitHub?", body: "Vi henter bare det som er offentlig.", content: fields.github(errors.github) },
  { id: "repoer", icon: "repository", title: "Hvilke repoer vil du følge?", content: fields.repos() },
  { id: "forside", icon: "view", title: "Hva skal stå på forsiden?", content: fields.sections() },
  { id: "tema", icon: "sun", title: "Lyst eller mørkt?", content: fields.theme() },
  { id: "effekter", icon: "idea", title: "Effekter", body: "Bilder og bakgrunner kan tegnes i 3D og følge lyset. Velg det som ser best ut for deg.", content: fields.effects() },
  { id: "bevegelse", icon: "device", title: "Skal lyset følge telefonen?", body: "På en telefon kan lyset i bildene følge hvordan du holder den.", content: fields.tilt() },
  { id: "installer", icon: "download", title: "Legg Startside på hjemskjermen", body: "Da åpner den som en app, uten nettleserens knapper.", content: <InstallPrompt appName="Startside" seen={false} cookiePath="/" preview="install" /> },
]
