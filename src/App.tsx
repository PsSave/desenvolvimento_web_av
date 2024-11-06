import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Check, RotateCcw, Trash2Icon, Undo } from "lucide-react"

interface Item {
  name: string;
  completed: boolean; 
}

function Menu() {
  return (
    <div className="py-2 border-b">
      Lista de Tarefas
    </div>
  );
}

function TodoItem({ item, concluir, remover }: {item: Item, concluir: any, remover: any}) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-md border bg-slate-50 transition-all shadow-sm hover:shadow-md ${
      item.completed && 'opacity-45 transition-all hover:opacity-80 '
    }`}>
      <div className={item.completed ? 'line-through' : ''}>{item.name}</div>
      <div className="flex gap-3">

        <Button variant="outline" size="icon" className={`text-green-500 hover:text-green-600`} onClick={concluir}>
          {
            !item.completed ? (
              <Check className="h-4 w-4" />
            ) : <Undo className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          }
        </Button>
        <Button variant="outline" size="icon"  className={`text-red-500 hover:text-red-600`} onClick={remover}>
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Conteudo() {
  const [itens, setItens] = useState([] as Item[]);

  function submeterFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const f = e.target as HTMLElement;
    const input = f.querySelector('input') as HTMLInputElement;
    const titulo = input.value;
    if (titulo) {

      const item: Item = {
        name: titulo,
        completed: false,
      }

      setItens([...itens, item]);
      input.value = '';
    } 
  }

  function remover(index: number) {
    const value = confirm('Deseja realmente excluir?')
    if(value) {

      setItens(itens.filter((_, i) => i !== index));
    }
  }

  function concluir(index: number) {
    const updatedItens = [...itens];
    const item = updatedItens[index]; 
    
    item.completed = !item.completed;
    setItens(updatedItens)
  }

  return (
    <div className="space-y-5">
      <form onSubmit={(e) => submeterFormulario(e)}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Escreva uma tarefa..." />
          <Button type="submit">Adicionar</Button>
        </div>
      </form>

      <div className="space-y-2">
        {itens.map((el, index) => {
          return <TodoItem key={index} item={el} concluir={() => concluir(index)} remover={() => remover(index)} />
        })}
      </div>
    </div>
  );
}

function Rodape() {
  return (
    <div className="py-2 border-t">
      TADS &copy; 2024
    </div>
  );
}

function App() {
  return (
    <div className="m-4 space-y-6">
      <Menu />
      <Conteudo />
      <Rodape />
    </div>
  );
}

export default App