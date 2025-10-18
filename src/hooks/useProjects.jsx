    /*
    File: src/hooks/useProjects.js
    Purpose: a small hook to manage project state (mock + CRUD helpers).
    */
    import React from "react";

    export function useProjects() {
    const [projects, setProjects] = React.useState(() => [
    {
    id: 'p1',
    name: 'Project Alpha',
    status: 'Under Development',
    lastCommit: '2025-10-10',
    description: 'Small tool to automate X. Uses GitHub Actions and Docker.',
    createdAt: new Date(2025, 7, 1).toISOString(),
    },
    {
    id: 'p2',
    name: 'DeployHero',
    status: 'Completed',
    lastCommit: '2025-09-28',
    description: 'A quick deploy pipeline for microservices.',
    createdAt: new Date(2025, 6, 10).toISOString(),
    },
    {
    id: 'p3',
    name: 'NetScanner',
    status: 'Pending',
    lastCommit: '2025-10-01',
    description: 'LAN discovery + inventory service (prototype).',
    createdAt: new Date(2025, 8, 5).toISOString(),
    },
    ]);


    const addProject = (proj) => {
    const id = 'p' + (projects.length + 1);
    setProjects((s) => [
    ...s,
    { id, ...proj, createdAt: new Date().toISOString(), lastCommit: proj.lastCommit || new Date().toISOString().split('T')[0] },
    ]);
    };


    const updateProject = (id, patch) => setProjects((s) => s.map((p) => (p.id === id ? { ...p, ...patch } : p)));


    const getProject = (id) => projects.find((p) => p.id === id);


    return { projects, addProject, updateProject, getProject };
    }