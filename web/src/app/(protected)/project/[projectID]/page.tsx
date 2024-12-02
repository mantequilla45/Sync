import AddColleagueForm from "@/components/Project/AddColleagueForm";

interface ProjectPageProps {
  params: {
    projectID: string;
  };
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const { projectID } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project: {projectID}</h1>
      <AddColleagueForm projectUID={projectID} />
    </div>
  );
};

export default ProjectPage;
