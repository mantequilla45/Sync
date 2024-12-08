import AddColleagueForm from "@/components/Project/AddColleagueForm";
import { headers } from 'next/headers';
import { getColleagues } from "@/components/protected/Collaborators/ColleagueFunctions";


interface ProjectPageProps {
  params: {
    projectID: string;
  };
}

const ProjectPage: React.FC<ProjectPageProps> = async ({ params }) => {
  const incomingHeaders = headers();

  const headersObject: Record<string, string> = {};
  incomingHeaders.forEach((value, key) => {
      headersObject[key] = value;
  });
  const { projectID } = params;
  const {colleagues} = await getColleagues(headersObject);

  console.log(colleagues);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project: {projectID}</h1>
      <AddColleagueForm projectUID={projectID} colleagues={colleagues} />
    </div>
  );
};

export default ProjectPage;
