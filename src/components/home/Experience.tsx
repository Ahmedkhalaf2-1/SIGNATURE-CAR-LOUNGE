import { Reveal } from '../common/Reveal'

const STEPS = [
  { label: '01 / UNDERSTAND', title: 'Listen closely.', body: 'We begin with your vehicle, the smallest details and the finish you envision.' },
  { label: '02 / REFINE', title: 'Every surface matters.', body: 'Thoughtful preparation, technical precision and considered craftsmanship.' },
  { label: '03 / REVEAL', title: 'Make it Signature.', body: 'A remarkable expression of your car, brought together with intention.' },
]

export function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <Reveal className="kicker intro-label">03 / The Signature Experience</Reveal>
        <Reveal as="h2" className="serif">
          Beyond the finish.
          <br />
          <em>Into the feeling.</em>
        </Reveal>
        <Reveal className="timeline">
          {STEPS.map((s) => (
            <div key={s.label}>
              <b>{s.label}</b>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
