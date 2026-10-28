import { Reveal } from '../common/Reveal'
import { useI18n } from '../../i18n'

const STEPS = [
  { label: '01 / UNDERSTAND', title: 'Listen closely.', body: 'We begin with your vehicle, the smallest details and the finish you envision.' },
  { label: '02 / REFINE', title: 'Every surface matters.', body: 'Thoughtful preparation, technical precision and considered craftsmanship.' },
  { label: '03 / REVEAL', title: 'Make it Signature.', body: 'A remarkable expression of your car, brought together with intention.' },
]

export function Experience() {
  const { t } = useI18n()
  return (
    <section className="experience" id="experience">
      <div className="container">
        <Reveal className="kicker intro-label">{t('03 / The Signature Experience')}</Reveal>
        <Reveal as="h2" className="serif">
          {t('Beyond the finish.')}
          <br />
          <em>{t('Into the feeling.')}</em>
        </Reveal>
        <Reveal className="timeline">
          {STEPS.map((s) => (
            <div key={s.label}>
              <b>{t(s.label)}</b>
              <h3>{t(s.title)}</h3>
              <p>{t(s.body)}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
