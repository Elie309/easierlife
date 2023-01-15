import Note from "./Note";

interface Props {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
}


const NotesArray: Props[] = [
    {
        id: 1,
        title: 'Note 1',
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus expedita laboriosam atque sunt aut minima fugiat at eligendi nisi iusto rem officia maiores sint sit voluptatibus sequi repudiandae, dolorem suscipit.",
        date: '2021-01-01',
        author: 'John Doe'
    },
    {
        id: 2,
        title: 'Note 2',
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus expedita laboriosam atque sunt aut minima fugiat at eligendi nisi iusto rem officia maiores sint sit voluptatibus sequi repudiandae, dolorem suscipit.",
        date: '2021-01-01',
        author: 'John Doe',
    },
    {
        id: 3,
        title: 'Note 3',
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus expedita laboriosam atque sunt aut minima fugiat at eligendi nisi iusto rem officia maiores sint sit voluptatibus sequi repudiandae, dolorem suscipit.",
        date: '2021-01-01',
        author: 'John Doe'
    },
    {
        id: 4,
        title: 'Note 4',
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus expedita laboriosam atque sunt aut minima fugiat at eligendi nisi iusto rem officia maiores sint sit voluptatibus sequi repudiandae, dolorem suscipit.",
        date: '2021-01-01',
        author: 'John Doe',
    },
]


function Notes() {
  return (
    <div className="flex flex-row flex-wrap p-10">
        {NotesArray.map((note) => (
            <Note
                className="mx-5 my-1"
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                date={note.date}
                author={note.author}
                
            />
        ))}
    </div>
  )
}

export default Notes