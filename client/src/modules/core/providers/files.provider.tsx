import { createContext, useContext, useState } from 'react';
import type { ReactProps } from '@global';
import type { UploadedFile } from '../types';

const FilesContext = createContext(
  {} as {
    files: UploadedFile[];
    addFile: (file: UploadedFile) => void;
    removeFile: (index: number) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isEmpty: () => boolean;
  },
);

const Files = ({ children }: ReactProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const addFile = (file: UploadedFile) => {
    setFiles([...files, file]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const isEmpty = () => {
    return files.length === 0;
  };

  return (
    <FilesContext.Provider
      value={{
        files,
        addFile,
        removeFile,
        activeIndex,
        setActiveIndex,
        isEmpty,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default Files;
export const useFilesContext = () => useContext(FilesContext);
