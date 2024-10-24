interface MyComponentProps {
  children: React.ReactNode;
  title: string;
  href: string;
}

const MyComponent = ({ children, title, href }: MyComponentProps) => {
  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
};
