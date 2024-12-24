import { useEffect, useRef, useState } from "react"
import html2canvas from "html2canvas";

import bg from "../public/bg.png";

const phrases = [
  "Esse é meu último natal aqui em casa.",
  "KKKKKKKKK dei um berro no fretado",
  "Eu te bloqueei",
  "Você me bloqueou no insta",
  "Se fosse seus amigos...",
  "Não tô falando com você",
  "O meu marido [COLOQUE AQUI O NOME DE QUALQUER PESSOA - PRINCIPALMENTE SE PARECER COM O GUSTAVO]",
  "Vou casar com [COLOQUE AQUI O NOME DE QUALQUER PESSOA  - PRINCIPALMENTE SE PARECER COM O GUSTAVO]",
  "O pai da Clarice",
  "Nem vou te falar nada ~Raíssa revirando os olhos",
  "Jubs... jubs... jubs",
  "Fui eu que fiz [COLOQUE AQUI QUALQUER PRATO QUE ELA COM CERTEZA NÃO FARIA]",
  "Eu não vou... vou ter compromisso ~ela sem compromisso nenhum",
  "Esse é meu último dia de home office",
  "O queeee? 🗣🗣🗣🗣🗣",
  "Mandei no grupo do Magalu",
  "Você não me convidou [Depois de ter convidado ela N vezes]",
  "Gabrieeeeeeeel",
  "Eu sou a Nora preferida ",
  "Vou abrir um asilo ",
  "Bom dia povo bonito (com foto de café nos dias úteis e cerveja aos finais de semana e feriados)",
  "Quem é? (Qualquer foto da Clarice até seus 5 anos)",
  "Cadê minha Heineken?",
  "Você não me ama mais?",
  "Não tô em casa ~ela em casa",
  "Tênis novo???? ~o tênis branco, que está preto depois de você usar por 2 anos consecutivos"
]

function getRandomIndexByArrayLength(except?: number) {
  const max = phrases.length;
  let index;

  do {
    index = Math.floor(Math.random() * max);
  } while (index === except);

  return index;
}

function App() {
  const [currentPhrase, setCurrentPhrase] = useState<number>(getRandomIndexByArrayLength());

  const ref = useRef<HTMLDivElement>(null);

  function drawWord() {
    setCurrentPhrase((currentIndex) => getRandomIndexByArrayLength(currentIndex));
  }

  function handlePressSpace(event: KeyboardEvent) {
    if (event.key === " " || event.code === "Space") {
      drawWord();
    }
  }

  async function downloadImage() {
    if (!ref.current) {
      return;
    }

    const canvas = await html2canvas(ref.current, { windowWidth: 800, onclone(_, element) {
      element.classList.add("teste");
    }, });
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'screenshot.png';
        link.click();
        link.remove();
      }
    })
  }

  useEffect(() => {
    window.addEventListener("keyup", handlePressSpace);
    return () => {
      window.removeEventListener("keyup", handlePressSpace);
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-red-600/95 flex flex-col gap-12 items-center py-16 [&:not(.teste)>.only-screenshot]:hidden" ref={ref}>
      <div className="fixed top-1/2 -translate-y-1/2 -translate-x-1/2 scale-90 only-screenshot">
        <img src={bg} alt="" />
      </div>
      <div className="m-auto flex flex-col justify-center items-center gap-8 text-center">
        <h3 className="text-2xl sm:text-5xl text-white uppercase font-light hyphens-auto py-6">Qual meu mood Raíssa de hoje?</h3>
        <h2 className="text-8xl/[6rem] sm:text-[10rem]/[8.5rem] font-black px-8 sm:px-24 whitespace-pre-line text-balance uppercase hyphens-auto word-break highlight-font">
          {phrases[currentPhrase]}
        </h2>
        <span className="text-xl sm:text-2xl leading-6 bg-transparent border-none text-red-900 cursor-pointer mt-12" role="button" onClick={drawWord} data-html2canvas-ignore>
          Aperte <span className="border border-red-900 rounded-md px-4 py-1 text-inherit align-middle inline-flex items-center mx-2">Space</span> ou clique
        </span>
      </div>
      <button className="sm:fixed sm:right-8 sm:top-1/2 sm:-translate-y-1/2 rounded-full bg-transparent" onClick={downloadImage} data-html2canvas-ignore>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
      </button>
      <div className="h-16 only-screenshot" />
    </main>
  )
}

export { App }
