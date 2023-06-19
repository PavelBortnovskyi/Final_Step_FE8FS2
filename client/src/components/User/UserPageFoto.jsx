export function UserPageFoto({ hederImg }) {
  const defaultFoto =
    'https://pibig.info/uploads/posts/2022-07/1657189991_21-pibig-info-p-temno-sinii-fon-odnotonnii-23.jpg';
  const fotoPage = hederImg || defaultFoto;

  return (
    <>
      <img
        style={{
          width: '100%',
          maxHeight: '200px',
          objectFit: 'cover',
        }}
        src={fotoPage}
        alt="hederImg"
      />
    </>
  );
}
