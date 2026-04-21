function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function runAnimation() {
      setDisplay(0);
      const duration = 1400;
      const steps = 40;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(interval);
        } else {
          setDisplay(Math.floor(current));
        }
      }, duration / steps);
    }

    // Primeira vez quando entra na tela
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation();
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    // Loop a cada 4 segundos
    const loop = setInterval(runAnimation, 4000);

    return () => {
      observer.disconnect();
      clearInterval(loop);
    };
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}