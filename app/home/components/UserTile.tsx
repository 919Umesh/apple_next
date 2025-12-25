export default function UserTile({ title, bodyText }: { title: string; bodyText: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{bodyText}</p>
    </div>
  );
}
