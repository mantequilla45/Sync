import ColleagueList from "@/components/protected/Colleagues/ColleagueList";
import AddColleaguesForm from "@/components/protected/Colleagues/AddColleagueForm";
import { getColleagues } from "@/components/protected/Colleagues/ColleagueFunctions";
import { headers } from 'next/headers';

const ColleaguePage = async () => {

    const incomingHeaders = headers();

    const headersObject: Record<string, string> = {};
    incomingHeaders.forEach((value, key) => {
        headersObject[key] = value;
    });

    const data = await getColleagues(headersObject);
           
    return (
        <>
            <AddColleaguesForm></AddColleaguesForm>
            <ColleagueList colleagues={data.colleagues}></ColleagueList>
        </>

    )
}

export default ColleaguePage;