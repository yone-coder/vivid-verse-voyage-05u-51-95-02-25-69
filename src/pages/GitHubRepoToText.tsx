import React, { useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function GitHubRepoToTxt() {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownloadTxt = async () => {
    setError('');
    setLoading(true);
    
    try {
      const match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(\.git)?$/);
      if (!match) throw new Error('Invalid GitHub repo URL');

      const [_, user, repo] = match;
      const zipUrl = `https://codeload.github.com/${user}/${repo}/zip/refs/heads/main`;

      const response = await axios.get(zipUrl, { responseType: 'arraybuffer' });
      const zip = await JSZip.loadAsync(response.data);
      const files = zip.files;
      let textOutput = '';

      for (const filename in files) {
        const file = files[filename];
        if (!file.dir && !filename.includes('node_modules')) {
          const ext = filename.split('.').pop();
          if (['js', 'ts', 'tsx', 'py', 'md', 'txt', 'json', 'html', 'css'].includes(ext || '')) {
            const content = await file.async('string');
            textOutput += `\n--- ${filename} ---\n${content}\n`;
          }
        }
      }

      const blob = new Blob([textOutput], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `${repo}.txt`);
    } catch (err) {
      console.error(err);
      setError('Could not fetch or convert repository. Make sure the URL is correct and public.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">GitHub Repo to TXT</h1>
      <Input 
        placeholder="Paste your GitHub repo URL (e.g., https://github.com/user/repo)" 
        value={repoUrl} 
        onChange={(e) => setRepoUrl(e.target.value)} 
      />
      <Button onClick={handleDownloadTxt} disabled={loading}>
        {loading ? 'Converting...' : 'Convert to .txt'}
      </Button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}