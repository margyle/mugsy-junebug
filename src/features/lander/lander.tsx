// Define the props interface
interface ChangeMeProps {
  title: string;
  items: string[];
}

// Update the component to accept the props
export const Lander: React.FC<ChangeMeProps> = ({ title, items }) => {
  // Log the props to the console
  console.log('NavBar Props:', { title, items });

  return (
    <div>
      <h1>Lander: {title}</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
