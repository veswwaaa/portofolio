import React, { useState, useEffect } from 'react';
import { School, Cpu, Heart, Sparkles, User, Image as ImageIcon, GitBranch } from 'lucide-react';
import { portfolioData } from '../data';
import { Counter } from './animations/Counter';
import { Reveal } from './animations/Reveal';

export const About: React.FC = () => {
  const { bio, school, skills, interests, stats, photoUrl } = portfolioData;

  const [githubStats, setGithubStats] = useState({
    repos: stats[0]?.value || 32,
    years: stats[1]?.value || 3,
    commits: stats[2]?.value || 219,
    isLoaded: false
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Check local cache first
        const cacheKey = 'github_stats_veswwaaa';
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 1800000) { // 30 min cache
            setGithubStats({
              repos: parsed.repos,
              years: 3,
              commits: parsed.commits,
              isLoaded: true
            });
          }
        }

        // 1. Fetch repos count
        let reposCount = githubStats.repos;
        const userRes = await fetch('https://api.github.com/users/veswwaaa');
        if (userRes.ok) {
          const userData = await userRes.json();
          if (typeof userData.public_repos === 'number') {
            reposCount = userData.public_repos;
          }
        }

        // 2. Fetch total commits count
        let commitsCount = githubStats.commits;
        const commitsRes = await fetch('https://api.github.com/search/commits?q=author:veswwaaa');
        if (commitsRes.ok) {
          const commitsData = await commitsRes.json();
          if (typeof commitsData.total_count === 'number') {
            commitsCount = commitsData.total_count;
          }
        }

        setGithubStats({
          repos: reposCount,
          years: 3,
          commits: commitsCount,
          isLoaded: true
        });

        localStorage.setItem(cacheKey, JSON.stringify({
          repos: reposCount,
          commits: commitsCount,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.warn('GitHub API live stats fallback used:', err);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="tentang" className="py-16 sm:py-24 md:py-36 border-b border-brutal">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 sm:pb-8 md:pb-12 border-b border-brutal mb-8 sm:mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent-theme block mb-2 font-semibold">
              // MENGENAL LEBIH DEKAT
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight text-brutal">
              Tentang Saya
            </h2>
          </div>
          <span className="font-mono text-xs text-brutal-muted uppercase tracking-widest mt-2 sm:mt-0">
            [PELAJAR & DEVELOPER]
          </span>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Photo Placeholder / Profile (Col span 5) */}
          <Reveal delay={0.1} direction="up" className="md:col-span-5 flex">
            <div className="w-full border-2 border-brutal bg-brutal p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between border-b border-brutal pb-3 mb-6 font-mono text-xs text-brutal-muted uppercase">
                <span className="flex items-center gap-2">
                  <User size={13} /> FOTO DIRI
                </span>
                <span className="text-[10px] px-1.5 py-0.5 border border-brutal bg-accent-theme text-white">
                  PORTRAIT
                </span>
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full border border-brutal overflow-hidden flex flex-col items-center justify-center p-6 text-center bg-black/5 dark:bg-white/5">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Selvano Sena"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 border-2 border-dashed border-brutal flex items-center justify-center text-brutal-muted group-hover:border-accent-theme group-hover:text-accent-theme transition-colors">
                      <ImageIcon size={28} />
                    </div>
                    <span className="font-mono text-xs uppercase font-bold text-brutal tracking-wider">
                      Area Foto Pribadi
                    </span>
                    <p className="font-mono text-[11px] text-brutal-muted max-w-[200px] leading-relaxed">
                      Siap diisi fotomu! Cukup simpan foto di <code className="bg-accent-theme/20 px-1 py-0.5 text-accent-theme">public/me.jpeg</code>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 font-mono text-[11px] text-brutal-muted uppercase tracking-wider flex justify-between">
                <span>SELVANO SENA A.P</span>
                <span>BJB, KALSEL</span>
              </div>
            </div>
          </Reveal>

          {/* Right Column Bento Cards (Col span 7) */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Card 2: Bio (<= 40 words, casual, honest) */}
            <Reveal delay={0.2} direction="up">
              <div className="border-2 border-brutal bg-brutal p-6 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-accent-theme block mb-4 font-semibold">
                  // BIO SINGKAT
                </span>
                <p className="font-body text-xl sm:text-2xl font-normal leading-relaxed text-brutal">
                  {bio}
                </p>
              </div>
            </Reveal>

            {/* Card 3: Sekolah / Jurusan / Kelas */}
            <Reveal delay={0.3} direction="up">
              <div className="border-2 border-brutal bg-brutal p-6">
                <div className="flex items-center gap-2 font-mono text-xs text-brutal-muted uppercase mb-4">
                  <School size={14} className="text-accent-theme" />
                  <span>PENDIDIKAN & STATUS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-brutal pt-4">
                  <div>
                    <span className="font-mono text-[11px] text-brutal-muted uppercase block">
                      Sekolah
                    </span>
                    <span className="font-display text-lg font-bold text-brutal uppercase">
                      {school.institution}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-brutal-muted uppercase block">
                      Jurusan
                    </span>
                    <span className="font-display text-lg font-bold text-brutal uppercase">
                      {school.major}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-brutal-muted uppercase block">
                      Tingkat
                    </span>
                    <span className="font-display text-lg font-bold text-accent-theme uppercase">
                      {school.grade}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 4: Skill Chips + Lagi Suka */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 4: Tools & Skills */}
              <Reveal delay={0.4} direction="up">
                <div className="h-full border-2 border-brutal bg-brutal p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-brutal-muted uppercase mb-4">
                      <Cpu size={14} className="text-accent-theme" />
                      <span>SKILLS & STACK</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 border border-brutal bg-brutal font-mono text-xs uppercase font-medium hover:bg-accent-theme hover:text-white transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 5: Lagi Suka */}
              <Reveal delay={0.5} direction="up">
                <div className="h-full border-2 border-brutal bg-brutal p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-brutal-muted uppercase mb-4">
                      <Heart size={14} className="text-accent-theme" />
                      <span>LAGI SUKA</span>
                    </div>
                    <ul className="space-y-2">
                      {interests.map((item, idx) => (
                        <li
                          key={idx}
                          className="font-mono text-xs text-brutal flex items-start gap-2"
                        >
                          <span className="text-accent-theme font-bold">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Card 6: Stats / Animated Counters (Live from GitHub API) */}
            <Reveal delay={0.6} direction="up">
              <div className="border-2 border-brutal bg-brutal p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-brutal-muted uppercase">
                    <Sparkles size={14} className="text-accent-theme" />
                    <span>STATISTIK AKTIVITAS</span>
                  </div>

                  <a
                    href="https://github.com/veswwaaa"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-brutal-muted hover:text-accent-theme transition-colors uppercase border border-brutal/50 px-2 py-0.5"
                    title="Buka profil GitHub veswwaaa"
                  >
                    <GitBranch size={11} />
                    <span>Live via @veswwaaa</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-theme animate-pulse" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-brutal pt-4">
                  {/* Public Repos */}
                  <div>
                    <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brutal">
                      <Counter to={githubStats.repos} suffix="+" />
                    </div>
                    <span className="font-mono text-[9px] sm:text-xs text-brutal-muted uppercase mt-1 block leading-tight">
                      Repositori GitHub
                    </span>
                  </div>

                  {/* Years */}
                  <div>
                    <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brutal">
                      <Counter to={githubStats.years} suffix="+" />
                    </div>
                    <span className="font-mono text-[9px] sm:text-xs text-brutal-muted uppercase mt-1 block leading-tight">
                      Tahun Belajar Coding
                    </span>
                  </div>

                  {/* Commits Count */}
                  <div>
                    <div className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brutal">
                      <Counter to={githubStats.commits} suffix="+" />
                    </div>
                    <span className="font-mono text-[9px] sm:text-xs text-brutal-muted uppercase mt-1 block leading-tight">
                      Total Commit GitHub
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
