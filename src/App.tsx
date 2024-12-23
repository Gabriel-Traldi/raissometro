import { useEffect, useState } from "react"

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

  function drawWord() {
    setCurrentPhrase((currentIndex) => getRandomIndexByArrayLength(currentIndex));
  }

  function handlePressSpace(event: KeyboardEvent) {
    if (event.key === " " || event.code === "Space") {
      drawWord();
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", handlePressSpace);
    return () => {
      window.removeEventListener("keyup", handlePressSpace);
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-red-600/95 flex items-center py-16">
      <div className="m-auto flex flex-col justify-center items-center gap-8 text-center">
        <h3 className="text-2xl sm:text-5xl text-white uppercase font-light hyphens-auto py-6">Qual meu mood Raíssa de hoje?</h3>
        <h2 className="text-8xl/[6rem] sm:text-[10rem]/[8.5rem] font-black px-8 sm:px-24 whitespace-pre-line text-balance uppercase hyphens-auto word-break highlight-font">
          {phrases[currentPhrase]}
        </h2>
        <span className="text-xl sm:text-2xl leading-6 bg-transparent border-none text-red-900 cursor-pointer mt-12" role="button" onClick={drawWord}>
          Aperte <span className="border border-red-900 rounded-md px-4 py-1 text-inherit align-middle inline-flex items-center mx-2">Space</span> ou clique
        </span>
      </div>
    </main>
  )
}

export { App }
