'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const UnsavedChangesContext = createContext({
  dirty: false,
  setDirty: () => {},
  guard: () => {},
});

export function UnsavedChangesProvider({ children }) {
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return undefined;
    const onBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  /* onClick guard for in-app links (Next's Link bypasses beforeunload). */
  const guard = useCallback(
    (event) => {
      if (dirty && !window.confirm('You have unsaved changes. Leave this page?')) {
        event.preventDefault();
      }
    },
    [dirty]
  );

  const value = useMemo(() => ({ dirty, setDirty, guard }), [dirty, guard]);

  return (
    <UnsavedChangesContext.Provider value={value}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);
