import { FrankensteinLabHero } from '../components/FrankensteinLabHero';

const FrankensteinLab = () => {
  const handleProjectClick = (project: any) => {
    console.log(`Activated project: ${project.title}`);
    // Here you can add navigation logic or open a modal
  };

  return <FrankensteinLabHero onProjectClick={handleProjectClick} />;
};

export default FrankensteinLab;
