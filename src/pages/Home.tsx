function Home() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="bio-card p-8">
        <p className="text-caption font-semibold uppercase tracking-[0.3em] text-biology-bark">
          Curriculum
        </p>
        <h1 className="mt-3 text-4xl">Foundations for biologists</h1>
        <p className="mt-4 text-slate-700">
          Use the theme tokens to keep lessons visually coherent across the app.
        </p>
      </article>
      <article className="bio-card p-8">
        <p className="text-caption font-semibold uppercase tracking-[0.3em] text-biology-bark">
          Components
        </p>
        <div className="mt-4 space-y-4">
          <button className="bio-button">Primary action</button>
          <input className="bio-input" defaultValue="Example input" />
        </div>
      </article>
    </section>
  )
}

export default Home
