'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProjectBoard from '@/components/ProjectBoard';

const SAMPLE_PROJECT_ID = '123456';

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState(SAMPLE_PROJECT_ID);

  return (
    <Layout>
      <ProjectBoard 
        projectId={activeProjectId} 
        projectName="Project PlanetX"
      />
    </Layout>
  );
}
