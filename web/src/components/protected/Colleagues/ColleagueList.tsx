interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
}

export async function ColleagueList({ colleagues }: Readonly<{ colleagues: Colleague[] }>) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Colleague List</h2>
            <ul className="space-y-4">
                {colleagues.map((colleague) => (
                    <li key={colleague.uid} className="flex items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <img src={colleague.displayPicture} alt={`${colleague.displayName}'s display`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-700">{colleague.displayName}</div>
                            <div className="text-sm text-gray-500">ID: {colleague.uid}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ColleagueList;
