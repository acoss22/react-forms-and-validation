
interface IHeader {
  name: string;
//   onClicked?
}

export const Header = ({ name }: IHeader) => {
 

  return (
   <h1>
      {name} 
    </h1>
  );
};
