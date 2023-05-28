import { useSelector } from "react-redux";

export function UserPageFoto() {
  const headerImgUrl =
    useSelector((state) => state.auth.headerImgUrl) ||
    "https://pibig.info/uploads/posts/2022-07/1657189991_21-pibig-info-p-temno-sinii-fon-odnotonnii-23.jpg";

  return (
    headerImgUrl && (
      <>
        <img
          style={{
            width: "100%",
            maxHeight: "200px",
          }}
          src={headerImgUrl}
          alt=""
        />
      </>
    )
  );
}
