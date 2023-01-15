interface Props {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;

    className?: string;
}


function Note(props: Props): React.ReactElement {
    return (
        <div className={`bg-skin-fill 
                        hover:bg-skin-fill-muted
                        hover:cursor-pointer
                        border-2 border-skin-base 
                        max-w-md rounded-md
                        shadow-inner
                        py-3 px-2 
                        ${props.className}`
        }>
            <h1 className="text-skin-base text-2xl font-bold mb-2">{props.title}</h1>
            <p className="text-skin-base">{props.content}</p>
            <br />
            <p className="text-skin-muted italic">{props.author} - {props.date}</p>

        </div>
    )
}

export default Note;