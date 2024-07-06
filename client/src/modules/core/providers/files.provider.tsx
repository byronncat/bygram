import { createContext, useContext, useState } from 'react';
import type { ReactProps } from '@global';
import type { UploadedFile } from '../types';

const FilesContext = createContext(
  {} as {
    files: UploadedFile[];
    addFile: (file: UploadedFile) => void;
    removeFile: (id: UploadedFile['id']) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isEmpty: () => boolean;
  },
);

const Files = ({ children }: ReactProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function setActiveIndexHandler(index: number) {
    const _index =
      index >= files.length ? 0 : index < 0 ? files.length - 1 : index;
    setActiveIndex(_index);
  }
  function addFile(file: UploadedFile) {
    setFiles([...files, file]);
  }
  function removeFile(id: UploadedFile['id']) {
    if (
      activeIndex !== 0 &&
      activeIndex === files.findIndex((file) => file.id === id)
    ) {
      setActiveIndexHandler(activeIndex - 1);
    }
    setFiles(files.filter((file) => file.id !== id));
  }
  function isEmpty() {
    return files.length === 0;
  }

  return (
    <FilesContext.Provider
      value={{
        files,
        addFile,
        removeFile,
        activeIndex,
        setActiveIndex: setActiveIndexHandler,
        isEmpty,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default Files;
export const useFilesContext = () => useContext(FilesContext);
