interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
}

export async function ColleagueList({ colleagues }: Readonly<{ colleagues: Colleague[] }>) {
    return (
        <div>
            <h1>Colleague List</h1>
            <ul>
                {colleagues.map((colleague) => (
                    <li key={colleague.uid}>
                        <div>ID: {colleague.uid}</div>
                        <div>Name: {colleague.displayName}</div>
                        <div>Picture: <img src={colleague.displayPicture} alt={`${colleague.displayName}'s display`} /></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ColleagueList;
