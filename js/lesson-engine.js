/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║        CYBER LESSON ENGINE v1.0 - Professional Pedagogy     ║
 * ║     Scaffolding | ZPD | Visual | Interactive | Adaptive     ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const LessonEngine = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // PEDAGOGY PROFILES - أنماط التعلم
    // ═══════════════════════════════════════════════════════════
    const LEARNING_PROFILES = {
        child: {
            tone: 'playful',
            emoji: true,
            analogies: 'games',      // مقارنات بالألعاب
            pace: 'slow',            // بطيء
            hints: 'generous',       // تلميحات كثيرة
            rewardFreq: 'high',      // مكافآت متكررة
            maxSteps: 3,             // 3 خطوات فقط
            language: 'simple'       // لغة بسيطة
        },
        teen: {
            tone: 'cool',
            emoji: true,
            analogies: 'tech',       // مقارنات بتقنية
            pace: 'medium',
            hints: 'moderate',
            rewardFreq: 'medium',
            maxSteps: 5,
            language: 'casual'
        },
        adult: {
            tone: 'professional',
            emoji: false,
            analogies: 'realworld',  // مقارنات واقعية
            pace: 'fast',
            hints: 'minimal',
            rewardFreq: 'low',
            maxSteps: 7,
            language: 'technical'
        }
    };

    // ═══════════════════════════════════════════════════════════
    // LESSON STEP TYPES - أنواع خطوات الدرس
    // ═══════════════════════════════════════════════════════════
    const STEP_TYPES = {
        story: {
            icon: '📖',
            title: 'القصة',
            desc: 'سياق الدرس في عالم اللعبة'
        },
        concept: {
            icon: '💡',
            title: 'المفهوم',
            desc: 'شرح النظرية بطريقة بصرية'
        },
        demo: {
            icon: '👁️',
            title: 'العرض',
            desc: 'مشاهدة الكود يعمل'
        },
        practice: {
            icon: '✍️',
            title: 'التطبيق',
            desc: 'جرب بنفسك في المحاكي'
        },
        challenge: {
            icon: '🎯',
            title: 'التحدي',
            desc: 'اختبر نفسك بدون مساعدة'
        },
        boss: {
            icon: '👹',
            title: 'معركة البوس',
            desc: 'استخدم كل ما تعلمته'
        }
    };

    // ═══════════════════════════════════════════════════════════
    // ADAPTIVE LESSON BUILDER
    // ═══════════════════════════════════════════════════════════
    class LessonBuilder {
        constructor(containerId, options) {
            this.container = document.getElementById(containerId);
            this.options = {
                profile: 'teen',       // child | teen | adult
                topic: 'linux',
                level: 1,
                ...options
            };
            this.profile = LEARNING_PROFILES[this.options.profile];
            this.steps = [];
            this.currentStep = 0;
            this.stepElements = [];
        }

        // ═══════════════════════════════════════════════════════
        // ADD STEP - إضافة خطوة للدرس
        // ═══════════════════════════════════════════════════════
        addStory(scenes) {
            this.steps.push({ type: 'story', data: scenes });
            return this;
        }

        addConcept(conceptData) {
            this.steps.push({ type: 'concept', data: conceptData });
            return this;
        }

        addDemo(demoData) {
            this.steps.push({ type: 'demo', data: demoData });
            return this;
        }

        addPractice(practiceData) {
            this.steps.push({ type: 'practice', data: practiceData });
            return this;
        }

        addChallenge(questions) {
            this.steps.push({ type: 'challenge', data: questions });
            return this;
        }

        // ═══════════════════════════════════════════════════════
        // RENDER - بناء الدرس كاملاً
        // ═══════════════════════════════════════════════════════
        render() {
            // Register this builder globally for navigation
            if (!window.__lessonBuilders) window.__lessonBuilders = [];
            window.__lessonBuilders.push(this);
            
            this.container.innerHTML = '';
            
            // Header: Progress Bar
            const header = document.createElement('div');
            header.className = 'lesson-header';
            header.innerHTML = `
                <div class="lesson-progress">
                    <div class="lesson-progress-bar" id="lesson-progress-bar"></div>
                </div>
                <div class="lesson-steps-nav" id="lesson-steps-nav"></div>
            `;
            this.container.appendChild(header);

            // Steps Container
            const stepsContainer = document.createElement('div');
            stepsContainer.className = 'lesson-steps-container';
            stepsContainer.id = 'lesson-steps-container';
            this.container.appendChild(stepsContainer);

            // Render each step
                const self = this;
            this.steps.forEach((step, index) => {
                const stepEl = document.createElement('div');
                stepEl.className = 'lesson-step';
                stepEl.dataset.index = index;
                stepEl.style.display = index === 0 ? 'block' : 'none';
                
                const typeInfo = STEP_TYPES[step.type];
                stepEl.innerHTML = `
                    <div class="lesson-step-badge">${typeInfo.icon} ${typeInfo.title}</div>
                    <div class="lesson-step-content" id="step-content-${index}"></div>
                    <div class="lesson-step-nav" id="step-nav-${index}">
                        ${index > 0 ? `<button class="cyber-btn" id="prev-btn-${index}">⬅️ السابق</button>` : ''}
                        ${index < this.steps.length - 1 ? `<button class="cyber-btn primary" id="next-btn-${index}">التالي ➡️</button>` : `<button class="cyber-btn primary" id="finish-btn-${index}">إكمال الدرس 🏆</button>`}
                    </div>
                `;
                
                stepsContainer.appendChild(stepEl);
                this.stepElements.push(stepEl);
                
                // Render content based on type
                this.renderStepContent(step, index);
            });

            // Navigation dots
            this.updateNav();
            this.updateProgress();
            
            // Attach navigation listeners
            this.attachNavListeners();
        }

        // ═══════════════════════════════════════════════════════
        // RENDER STEP CONTENT - محتوى كل خطوة
        // ═══════════════════════════════════════════════════════
        renderStepContent(step, index) {
            const contentEl = document.getElementById(`step-content-${index}`);
            const p = this.profile;

            switch(step.type) {
                case 'story':
                    this.renderStory(contentEl, step.data, p);
                    break;
                case 'concept':
                    this.renderConcept(contentEl, step.data, p);
                    break;
                case 'demo':
                    this.renderDemo(contentEl, step.data, p);
                    break;
                case 'practice':
                    this.renderPractice(contentEl, step.data, p, index);
                    break;
                case 'challenge':
                    this.renderChallenge(contentEl, step.data, p, index);
                    break;
            }
        }

        // ═══════════════════════════════════════════════════════
        // STORY RENDERER - القصة السينمائية
        // ═══════════════════════════════════════════════════════
        renderStory(el, scenes, p) {
            el.innerHTML = `<div class="lesson-story-container" id="story-${this.options.level}"></div>`;
            const storyEl = el.querySelector('.lesson-story-container');
            
            let current = 0;
            const showNext = () => {
                if (current >= scenes.length) {
                    document.getElementById(`next-btn-${this.currentStep}`).disabled = false;
                    return;
                }
                
                const scene = scenes[current];
                const line = document.createElement('div');
                line.className = 'lesson-story-line fade-in-up';
                line.style.animationDelay = `${current * 0.3}s`;
                
                const text = p.language === 'simple' 
                    ? scene.simple || scene.text 
                    : scene.text;
                
                line.innerHTML = `
                    <div class="lesson-story-avatar">${scene.avatar || '🤖'}</div>
                    <div class="lesson-story-bubble">
                        <div class="lesson-story-speaker">${scene.speaker || 'Agent Zero'}</div>
                        <div class="lesson-story-text">${text}</div>
                    </div>
                `;
                
                storyEl.appendChild(line);
                storyEl.scrollTop = storyEl.scrollHeight;
                
                if (window.CyberEngine && window.CyberEngine.audio) {
                    window.CyberEngine.audio.type();
                }
                
                current++;
                setTimeout(showNext, scene.delay || 1500);
            };
            
            showNext();
            document.getElementById(`next-btn-${this.currentStep}`).disabled = true;
        }

        // ═══════════════════════════════════════════════════════
        // CONCEPT RENDERER - شرح المفهوم البصري
        // ═══════════════════════════════════════════════════════
        renderConcept(el, data, p) {
            const analogy = p.analogies === 'games' ? data.analogy.game 
                          : p.analogies === 'tech' ? data.analogy.tech 
                          : data.analogy.real;
            
            const explanation = p.language === 'simple' ? data.explanation.simple 
                              : p.language === 'technical' ? data.explanation.technical 
                              : data.explanation.normal;

            el.innerHTML = `
                <div class="lesson-concept-card fade-in-up">
                    <div class="lesson-concept-visual" id="concept-visual-${this.options.level}">
                        ${data.visualHTML || ''}
                    </div>
                    <div class="lesson-concept-analogy">
                        <div class="lesson-concept-analogy-icon">🎮</div>
                        <div class="lesson-concept-analogy-text">
                            <strong>${p.analogies === 'games' ? 'مثل اللعبة:' : p.analogies === 'tech' ? 'مثل التقنية:' : 'مثل الحياة:'}</strong>
                            ${analogy}
                        </div>
                    </div>
                    <div class="lesson-concept-explanation">
                        <h3>💡 ${data.title}</h3>
                        <p>${explanation}</p>
                    </div>
                    ${data.codeExample ? `
                    <div class="lesson-concept-code">
                        <div class="lesson-concept-code-header">
                            <span class="terminal-btn red"></span>
                            <span class="terminal-btn yellow"></span>
                            <span class="terminal-btn green"></span>
                            <span>CODE EXAMPLE</span>
                        </div>
                        <pre class="lesson-concept-code-body"><code>${data.codeExample}</code></pre>
                    </div>
                    ` : ''}
                    ${data.tips ? `
                    <div class="lesson-concept-tips">
                        <div class="lesson-concept-tip-icon">💡</div>
                        <div class="lesson-concept-tip-text">${data.tips}</div>
                    </div>
                    ` : ''}
                </div>
            `;

            // Animate visual if provided
            if (data.visualAnimation) {
                setTimeout(() => data.visualAnimation(el.querySelector('.lesson-concept-visual')), 100);
            }
        }

        // ═══════════════════════════════════════════════════════
        // DEMO RENDERER - عرض تفاعلي
        // ═══════════════════════════════════════════════════════
        renderDemo(el, data, p) {
            el.innerHTML = `
                <div class="lesson-demo-container fade-in-up">
                    <div class="lesson-demo-screen" id="demo-screen-${this.options.level}">
                        <div class="lesson-demo-output" id="demo-output"></div>
                    </div>
                    <div class="lesson-demo-controls">
                        <button class="cyber-btn" id="demo-play-btn">▶️ شغّل العرض</button>
                        <button class="cyber-btn" id="demo-step-btn" style="display:none;">⏭️ خطوة تالية</button>
                    </div>
                    <div class="lesson-demo-explanation" id="demo-explanation"></div>
                </div>
            `;

            let stepIndex = 0;
            const output = el.querySelector('#demo-output');
            const exp = el.querySelector('#demo-explanation');
            const playBtn = el.querySelector('#demo-play-btn');
            const stepBtn = el.querySelector('#demo-step-btn');

            const runStep = () => {
                if (stepIndex >= data.steps.length) {
                    exp.innerHTML = `<div class="lesson-demo-done">✅ ${p.language === 'simple' ? 'شفت كيف صار؟' : 'فهمت الآن؟ جرب بنفسك في الخطوة التالية!'}</div>`;
                    stepBtn.style.display = 'none';
                    return;
                }

                const step = data.steps[stepIndex];
                const line = document.createElement('div');
                line.className = `lesson-demo-line ${step.type || 'output'}`;
                line.innerHTML = `<span class="lesson-demo-prompt">${step.prompt || '$'}</span> ${step.text}`;
                line.style.animation = 'fadeInUp 0.3s ease-out';
                output.appendChild(line);
                output.scrollTop = output.scrollHeight;

                if (step.explanation) {
                    exp.innerHTML = `<div class="lesson-demo-step-exp fade-in-up">${step.explanation}</div>`;
                }

                if (window.CyberEngine && window.CyberEngine.audio) {
                    window.CyberEngine.audio.type();
                }

                stepIndex++;
            };

            playBtn.addEventListener('click', () => {
                playBtn.style.display = 'none';
                stepBtn.style.display = 'inline-block';
                runStep();
            });

            stepBtn.addEventListener('click', runStep);
        }

        // ═══════════════════════════════════════════════════════
        // PRACTICE RENDERER - تطبيق تفاعلي
        // ═══════════════════════════════════════════════════════
        renderPractice(el, data, p, stepIndex) {
            const hintText = p.hints === 'generous' ? '💡 اضغط هنا للمساعدة!' 
                           : p.hints === 'minimal' ? '💡 تلميح (استخدم بحذر)' 
                           : '💡 أحتاج تلميحاً';

            el.innerHTML = `
                <div class="lesson-practice-container fade-in-up">
                    <div class="lesson-practice-task">
                        <div class="lesson-practice-task-icon">🎯</div>
                        <div class="lesson-practice-task-text">
                            <strong>المهمة:</strong> ${data.task}
                        </div>
                    </div>
                    <div class="lesson-practice-terminal" id="practice-terminal-${stepIndex}"></div>
                    <div class="lesson-practice-hint">
                        <button class="cyber-btn" id="practice-hint-btn-${stepIndex}">${hintText}</button>
                        <div class="lesson-practice-hint-text" id="practice-hint-text-${stepIndex}" style="display:none;"></div>
                    </div>
                    <div class="lesson-practice-feedback" id="practice-feedback-${stepIndex}"></div>
                </div>
            `;

            // Setup terminal - built-in fallback
            const termEl = document.getElementById(`practice-terminal-${stepIndex}`);
            if (termEl) {
                // Create simple built-in terminal
                const term = {
                    el: termEl,
                    history: [],
                    historyIndex: -1,
                    prompt: data.prompt || 'agent@cyber-rpg:~$ ',
                    
                    print: function(text, type) {
                        const line = document.createElement('div');
                        line.style.cssText = 'padding:4px 0; font-family:var(--font-mono); border-bottom:1px solid rgba(0,255,65,0.1);';
                        if (type === 'error') line.style.color = 'var(--neon-red)';
                        else if (type === 'success') line.style.color = 'var(--neon-green)';
                        else line.style.color = '#d4d4d4';
                        line.textContent = text;
                        this.output.appendChild(line);
                        this.output.scrollTop = this.output.scrollHeight;
                    },
                    
                    clear: function() {
                        this.output.innerHTML = '';
                    }
                };
                
                // Build terminal UI
                termEl.style.cssText = 'background:#0d0d0d; border:1px solid var(--neon-green); border-radius:8px; padding:15px; font-family:var(--font-mono); min-height:200px;';
                termEl.innerHTML = '<div class="term-output" style="min-height:150px; max-height:250px; overflow-y:auto; margin-bottom:10px;"></div><div class="term-input-line" style="display:flex; align-items:center;"><span class="term-prompt" style="color:var(--neon-green); margin-left:5px;"></span><input type="text" class="term-input" style="flex:1; background:transparent; border:none; color:#d4d4d4; font-family:var(--font-mono); font-size:1rem; outline:none;" autocomplete="off" spellcheck="false"></div>';
                
                term.output = termEl.querySelector('.term-output');
                term.promptEl = termEl.querySelector('.term-prompt');
                term.input = termEl.querySelector('.term-input');
                term.promptEl.textContent = term.prompt;
                
                // Print welcome
                term.print('=== Terminal جاهز ===', 'success');
                term.print('اكتب help للمساعدة');
                
                // Command handler
                const commandHandlers = {};
                if (data.commands) {
                    Object.keys(data.commands).forEach(cmd => {
                        commandHandlers[cmd] = data.commands[cmd];
                    });
                }
                
                // Default commands
                commandHandlers['help'] = function(args, t) {
                    t.print('=== الأوامر المتاحة ===', 'success');
                    Object.keys(commandHandlers).forEach(c => t.print('  ' + c));
                };
                commandHandlers['clear'] = function(args, t) {
                    t.clear();
                };
                
                // Input handler
                term.input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        const cmdLine = this.value.trim();
                        if (!cmdLine) return;
                        
                        // Echo
                        const echo = document.createElement('div');
                        echo.style.cssText = 'color:var(--neon-green); padding:4px 0;';
                        echo.textContent = term.prompt + ' ' + cmdLine;
                        term.output.appendChild(echo);
                        
                        // Parse
                        const parts = cmdLine.split(/\s+/);
                        const cmd = parts[0];
                        const args = parts.slice(1);
                        
                        // Execute
                        if (commandHandlers[cmd]) {
                            try {
                                commandHandlers[cmd](args, term, builder);
                            } catch(err) {
                                term.print('❌ خطأ: ' + err.message, 'error');
                            }
                        } else {
                            term.print('❌ أمر غير معروف: ' + cmd, 'error');
                            term.print('اكتب help للمساعدة');
                        }
                        
                        // History
                        term.history.push(cmdLine);
                        term.historyIndex = term.history.length;
                        this.value = '';
                        term.output.scrollTop = term.output.scrollHeight;
                        
                        if (window.CyberEngine && window.CyberEngine.audio) {
                            window.CyberEngine.audio.click();
                        }
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (term.historyIndex > 0) {
                            term.historyIndex--;
                            this.value = term.history[term.historyIndex];
                        }
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (term.historyIndex < term.history.length - 1) {
                            term.historyIndex++;
                            this.value = term.history[term.historyIndex];
                        } else {
                            term.historyIndex = term.history.length;
                            this.value = '';
                        }
                    }
                });
                
                // Focus on click
                termEl.addEventListener('click', () => term.input.focus());

                // Hint system
                const hintBtn = document.getElementById(`practice-hint-btn-${stepIndex}`);
                const hintTextEl = document.getElementById(`practice-hint-text-${stepIndex}`);
                let hintLevel = 0;
                
                hintBtn.addEventListener('click', () => {
                    if (hintLevel < data.hints.length) {
                        hintTextEl.style.display = 'block';
                        hintTextEl.innerHTML += `<div class="lesson-hint-line fade-in-up">${data.hints[hintLevel]}</div>`;
                        hintLevel++;
                        
                        if (window.CyberEngine) {
                            window.CyberEngine.state.currentSession.hintsUsed++;
                        }
                    } else {
                        hintTextEl.innerHTML += `<div class="lesson-hint-line fade-in-up" style="color:#ff3333;">🚫 لا مزيد من التلميحات!</div>`;
                        hintBtn.disabled = true;
                    }
                });
            }

            // Success callback
            this.onPracticeSuccess = data.onSuccess;
        }

        // ═══════════════════════════════════════════════════════
        // CHALLENGE RENDERER - اختبار
        // ═══════════════════════════════════════════════════════
        renderChallenge(el, questions, p, stepIndex) {
            let currentQ = 0;
            let score = 0;
            const total = questions.length;

            const showQuestion = () => {
                if (currentQ >= total) {
                    const percentage = Math.round((score / total) * 100);
                    const passed = percentage >= 70;
                    
                    el.innerHTML = `
                        <div class="lesson-challenge-result fade-in-up">
                            <div class="lesson-challenge-result-icon">${passed ? '🏆' : '💪'}</div>
                            <h2>${passed ? 'نجحت!' : 'حاول مرة أخرى!'}</h2>
                            <div class="lesson-challenge-score">${score}/${total} (${percentage}%)</div>
                            ${passed ? `
                                <div class="lesson-challenge-reward">+${score * 25} XP</div>
                                <button class="cyber-btn primary" id="challenge-next-btn">إكمال الدرس ➡️</button>
                            ` : `
                                <button class="cyber-btn primary" onclick="location.reload()">إعادة المحاولة 🔄</button>
                            `}
                        </div>
                    `;

                    if (passed && window.CyberEngine) {
                        window.CyberEngine.addXP(score * 25, 'Challenge Complete');
                        window.CyberEngine.audio.levelUp();
                    }

                    document.getElementById('challenge-next-btn')?.addEventListener('click', () => {
                        LessonEngine.nextStep();
                    });
                    
                    return;
                }

                const q = questions[currentQ];
                el.innerHTML = `
                    <div class="lesson-challenge-question fade-in-up">
                        <div class="lesson-challenge-q-num">سؤال ${currentQ + 1} من ${total}</div>
                        <div class="lesson-challenge-q-text">${q.question}</div>
                        <div class="lesson-challenge-options" id="challenge-options-${stepIndex}"></div>
                    </div>
                `;

                const optsContainer = document.getElementById(`challenge-options-${stepIndex}`);
                q.options.forEach((opt, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'lesson-challenge-option';
                    btn.innerHTML = `<span class="lesson-challenge-opt-letter">${String.fromCharCode(65 + i)}</span> ${opt}`;
                    btn.addEventListener('click', () => {
                        const isCorrect = i === q.correct;
                        
                        if (isCorrect) {
                            btn.classList.add('correct');
                            score++;
                            if (window.CyberEngine) {
                                window.CyberEngine.audio.success();
                                window.CyberEngine.agentSpeak('correct');
                            }
                        } else {
                            btn.classList.add('wrong');
                            if (window.CyberEngine) {
                                window.CyberEngine.audio.fail();
                                window.CyberEngine.agentSpeak('wrong');
                                window.CyberEngine.state.currentSession.mistakes++;
                            }
                            // Show correct answer
                            setTimeout(() => {
                                optsContainer.children[q.correct].classList.add('correct');
                            }, 500);
                        }

                        // Disable all buttons
                        Array.from(optsContainer.children).forEach(b => b.disabled = true);

                        setTimeout(() => {
                            currentQ++;
                            showQuestion();
                        }, 1500);
                    });
                    optsContainer.appendChild(btn);
                });
            };

            showQuestion();
        }

        // ═══════════════════════════════════════════════════════
        // NAVIGATION
        // ═══════════════════════════════════════════════════════
        attachNavListeners() {
            this.steps.forEach((step, index) => {
                const nextBtn = document.getElementById(`next-btn-${index}`);
                const prevBtn = document.getElementById(`prev-btn-${index}`);
                const finishBtn = document.getElementById(`finish-btn-${index}`);
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        this.goToStep(this.currentStep + 1);
                    });
                }
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        this.goToStep(this.currentStep - 1);
                    });
                }
                if (finishBtn) {
                    finishBtn.addEventListener('click', () => {
                        if (window.CyberEngine) {
                            window.CyberEngine.audio.levelUp();
                            window.CyberEngine.agentSpeak('correct', '🎉 أحسنت! أكملت الدرس بنجاح!');
                        }
                        setTimeout(() => {
                            window.location.href = '../index.html';
                        }, 2000);
                    });
                }
            });
        }

        updateNav() {
            const nav = document.getElementById('lesson-steps-nav');
            if (!nav) return;
            nav.innerHTML = this.steps.map((s, i) => {
                const type = STEP_TYPES[s.type];
                const active = i === this.currentStep ? 'active' : i < this.currentStep ? 'completed' : '';
                return `<div class="lesson-nav-dot ${active}" onclick="LessonEngine.goToStep(${i})" title="${type.title}">${type.icon}</div>`;
            }).join('');
        }

        updateProgress() {
            const bar = document.getElementById('lesson-progress-bar');
            if (bar) {
                const pct = ((this.currentStep + 1) / this.steps.length) * 100;
                bar.style.width = `${pct}%`;
            }
        }

        goToStep(index) {
            if (index < 0 || index >= this.steps.length) return;
            // Allow navigation to any visited or next step
            
            this.stepElements[this.currentStep].style.display = 'none';
            this.currentStep = index;
            this.stepElements[this.currentStep].style.display = 'block';
            this.stepElements[this.currentStep].scrollIntoView({ behavior: 'smooth' });
            
            this.updateNav();
            this.updateProgress();
        }
    }

    // ═══════════════════════════════════════════════════════════
    // GLOBAL NAVIGATION API
    // ═══════════════════════════════════════════════════════════
    function nextStep() {
        const builders = window.__lessonBuilders || [];
        if (builders.length > 0) {
            const b = builders[builders.length - 1];
            b.goToStep(b.currentStep + 1);
        }
    }

    function prevStep() {
        const builders = window.__lessonBuilders || [];
        if (builders.length > 0) {
            const b = builders[builders.length - 1];
            b.goToStep(b.currentStep - 1);
        }
    }

    function goToStep(index) {
        const builders = window.__lessonBuilders || [];
        if (builders.length > 0) {
            builders[builders.length - 1].goToStep(index);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // CSS INJECTION - التصميم
    // ═══════════════════════════════════════════════════════════
    function injectStyles() {
        if (document.getElementById('lesson-engine-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'lesson-engine-styles';
        style.textContent = `
            /* ═══════════════════════════════════════════════════
               LESSON ENGINE STYLES
               ═══════════════════════════════════════════════════ */
            
            .lesson-header {
                position: sticky;
                top: 0;
                z-index: 50;
                background: rgba(10, 10, 15, 0.95);
                backdrop-filter: blur(10px);
                padding: 15px;
                border-bottom: 1px solid rgba(0, 255, 65, 0.2);
            }

            .lesson-progress {
                width: 100%;
                height: 6px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 15px;
            }

            .lesson-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--neon-green), var(--neon-blue));
                border-radius: 3px;
                transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 0 10px var(--neon-green);
            }

            .lesson-steps-nav {
                display: flex;
                justify-content: center;
                gap: 10px;
            }

            .lesson-nav-dot {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.5);
                border: 2px solid #333;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s;
            }

            .lesson-nav-dot.active {
                border-color: var(--neon-green);
                box-shadow: 0 0 15px var(--neon-green);
                transform: scale(1.1);
            }

            .lesson-nav-dot.completed {
                border-color: var(--neon-blue);
                background: rgba(0, 212, 255, 0.2);
            }

            .lesson-step {
                animation: fadeInUp 0.5s ease-out;
                padding: 20px 0;
            }

            .lesson-step-badge {
                display: inline-block;
                background: var(--panel-bg);
                border: 1px solid var(--neon-green);
                padding: 8px 20px;
                border-radius: 20px;
                font-family: var(--font-display);
                margin-bottom: 20px;
                box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
            }

            .lesson-step-nav {
                display: flex;
                justify-content: space-between;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid rgba(0, 255, 65, 0.2);
            }

            /* Story */
            .lesson-story-container {
                max-height: 400px;
                overflow-y: auto;
                padding: 20px;
            }

            .lesson-story-line {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
                align-items: flex-start;
            }

            .lesson-story-avatar {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--neon-blue), var(--neon-pink));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                flex-shrink: 0;
                border: 2px solid var(--neon-green);
            }

            .lesson-story-bubble {
                background: var(--panel-bg);
                border: 1px solid var(--neon-blue);
                border-radius: 16px;
                padding: 15px 20px;
                position: relative;
                flex: 1;
            }

            .lesson-story-bubble::before {
                content: '';
                position: absolute;
                top: 20px;
                right: -10px;
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-left: 10px solid var(--neon-blue);
            }

            .lesson-story-speaker {
                font-family: var(--font-mono);
                font-size: 0.8rem;
                color: var(--neon-blue);
                margin-bottom: 5px;
            }

            .lesson-story-text {
                font-size: 1.1rem;
                line-height: 1.8;
            }

            /* Concept */
            .lesson-concept-card {
                background: var(--panel-bg);
                border: 1px solid rgba(0, 255, 65, 0.2);
                border-radius: 16px;
                padding: 30px;
                position: relative;
                overflow: hidden;
            }

            .lesson-concept-visual {
                min-height: 150px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(0, 255, 65, 0.1);
            }

            .lesson-concept-analogy {
                display: flex;
                gap: 15px;
                background: rgba(255, 215, 0, 0.1);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }

            .lesson-concept-analogy-icon {
                font-size: 2rem;
            }

            .lesson-concept-explanation {
                margin: 20px 0;
            }

            .lesson-concept-explanation h3 {
                color: var(--neon-green);
                margin-bottom: 15px;
            }

            .lesson-concept-explanation p {
                line-height: 2;
                font-size: 1.1rem;
            }

            .lesson-concept-code {
                background: #1e1e1e;
                border-radius: 8px;
                overflow: hidden;
                margin: 20px 0;
                border: 1px solid rgba(0, 255, 65, 0.2);
            }

            .lesson-concept-code-header {
                background: #2d2d2d;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: var(--font-mono);
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .lesson-concept-code-body {
                padding: 20px;
                margin: 0;
                overflow-x: auto;
                font-family: var(--font-mono);
                font-size: 0.95rem;
                line-height: 1.8;
                color: #d4d4d4;
            }

            .lesson-concept-tips {
                display: flex;
                gap: 10px;
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid rgba(0, 212, 255, 0.3);
                border-radius: 8px;
                padding: 15px;
                margin-top: 20px;
            }

            .lesson-concept-tip-icon {
                font-size: 1.5rem;
            }

            .lesson-concept-tip-text {
                font-size: 0.95rem;
                line-height: 1.6;
            }

            /* Demo */
            .lesson-demo-container {
                background: var(--panel-bg);
                border-radius: 16px;
                padding: 20px;
            }

            .lesson-demo-screen {
                background: #0d0d0d;
                border: 1px solid var(--neon-green);
                border-radius: 8px;
                min-height: 200px;
                max-height: 300px;
                overflow-y: auto;
                padding: 20px;
                font-family: var(--font-mono);
                margin-bottom: 15px;
            }

            .lesson-demo-line {
                margin: 5px 0;
                padding: 5px 0;
                border-bottom: 1px solid rgba(0, 255, 65, 0.1);
            }

            .lesson-demo-prompt {
                color: var(--neon-green);
                margin-left: 10px;
            }

            .lesson-demo-line.command {
                color: var(--neon-blue);
            }

            .lesson-demo-line.output {
                color: #d4d4d4;
            }

            .lesson-demo-controls {
                text-align: center;
                margin-bottom: 15px;
            }

            .lesson-demo-explanation {
                background: rgba(0, 0, 0, 0.3);
                padding: 15px;
                border-radius: 8px;
                min-height: 50px;
            }

            .lesson-demo-done {
                text-align: center;
                color: var(--neon-green);
                font-size: 1.2rem;
                padding: 20px;
            }

            /* Practice */
            .lesson-practice-container {
                background: var(--panel-bg);
                border-radius: 16px;
                padding: 20px;
            }

            .lesson-practice-task {
                display: flex;
                gap: 15px;
                background: rgba(255, 51, 51, 0.1);
                border: 1px solid rgba(255, 51, 51, 0.3);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
            }

            .lesson-practice-task-icon {
                font-size: 2rem;
            }

            .lesson-practice-task-text {
                font-size: 1.1rem;
                line-height: 1.6;
            }

            .lesson-practice-terminal {
                margin: 20px 0;
            }

            .lesson-practice-hint {
                margin: 15px 0;
            }

            .lesson-practice-hint-text {
                background: rgba(255, 215, 0, 0.1);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 8px;
                padding: 15px;
                margin-top: 10px;
            }

            .lesson-hint-line {
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 215, 0, 0.1);
            }

            .lesson-practice-feedback {
                min-height: 50px;
                margin-top: 15px;
            }

            /* Challenge */
            .lesson-challenge-question {
                background: var(--panel-bg);
                border-radius: 16px;
                padding: 30px;
            }

            .lesson-challenge-q-num {
                font-family: var(--font-mono);
                color: var(--neon-blue);
                margin-bottom: 10px;
            }

            .lesson-challenge-q-text {
                font-size: 1.3rem;
                margin-bottom: 25px;
                line-height: 1.8;
            }

            .lesson-challenge-options {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .lesson-challenge-option {
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid rgba(0, 255, 65, 0.2);
                padding: 18px 20px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s;
                text-align: right;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .lesson-challenge-option:hover {
                border-color: var(--neon-green);
                transform: translateX(-5px);
                background: rgba(0, 255, 65, 0.05);
            }

            .lesson-challenge-option.correct {
                background: rgba(0, 255, 65, 0.2);
                border-color: var(--neon-green);
                animation: correctPulse 0.5s;
            }

            .lesson-challenge-option.wrong {
                background: rgba(255, 51, 51, 0.2);
                border-color: var(--neon-red);
                animation: wrongShake 0.5s;
            }

            .lesson-challenge-option:disabled {
                cursor: not-allowed;
                opacity: 0.7;
            }

            .lesson-challenge-opt-letter {
                background: rgba(0, 255, 65, 0.1);
                border: 1px solid var(--neon-green);
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--font-mono);
                font-weight: 700;
                flex-shrink: 0;
            }

            .lesson-challenge-result {
                text-align: center;
                padding: 40px;
            }

            .lesson-challenge-result-icon {
                font-size: 5rem;
                margin-bottom: 20px;
            }

            .lesson-challenge-score {
                font-family: var(--font-display);
                font-size: 2rem;
                color: var(--neon-green);
                margin: 20px 0;
            }

            .lesson-challenge-reward {
                font-size: 1.5rem;
                color: var(--neon-gold);
                margin: 15px 0;
            }

            @keyframes correctPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }

            @keyframes wrongShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
    });

    // ═══════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════
    return {
        LessonBuilder,
        LEARNING_PROFILES,
        STEP_TYPES,
        nextStep,
        prevStep,
        goToStep,
        injectStyles
    };
})();

// Global access
window.LessonEngine = LessonEngine;
