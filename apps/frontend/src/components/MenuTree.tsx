export default function MenuTree({ nodes }: { nodes: any[] }) {
  return (
    <ul>
      {nodes.map(node => (
        <li key={node.id}>
          <div>{node.name} <button>+</button></div>
          {node.children && node.children.length > 0 && <MenuTree nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
}
