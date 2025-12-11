# 🔌 Integração com API - Norsel Vision

Este documento explica como a integração com a API Norsel foi implementada no frontend.

---

## 📋 Sumário

- [Estrutura da Integração](#estrutura-da-integração)
- [Como Usar](#como-usar)
- [Componentes Atualizados](#componentes-atualizados)
- [Funcionalidades](#funcionalidades)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Estrutura da Integração

### **Arquivos Criados**

```
src/
├── types/
│   └── norsel.ts                 # ✨ Tipos TypeScript para as entidades
├── services/
│   └── norselApi.ts              # ✨ Cliente HTTP da API
└── hooks/
    └── useNorsel.ts              # ✨ Hooks React Query (18 hooks)
```

### **Arquivos Atualizados**

```
src/pages/
├── Servicos.tsx                  # ✏️ Integrado com API
├── Portfolio.tsx                 # ✏️ Integrado com API
└── Clientes.tsx                  # ✏️ Integrado com API
```

---

## 🚀 Como Usar

### **Passo 1: Iniciar a API**

Certifique-se de que a API está rodando em `http://localhost:8000`:

```bash
cd C:\git\norsel-api

# Criar banco de dados (primeira vez)
python init_db.py

# Popular com dados iniciais (opcional)
python seed_new_entities.py

# Iniciar servidor
uvicorn app.main:app --reload
```

### **Passo 2: Iniciar o Frontend**

```bash
cd C:\git\norsel-vision
npm run dev
```

### **Passo 3: Acessar as Páginas**

- **Serviços**: `http://localhost:5173/servicos`
- **Portfolio**: `http://localhost:5173/portfolio`
- **Clientes**: `http://localhost:5173/clientes`

---

## 📦 Componentes Atualizados

### **1. Servicos.tsx**

**Antes:** Usava `useState` com dados locais hardcoded

**Depois:** Integrado com API REST

**Funcionalidades:**
- ✅ Carrega serviços da API
- ✅ Cria novos serviços
- ✅ Edita serviços existentes
- ✅ Deleta serviços
- ✅ Reordena via drag & drop (sincroniza com API)
- ✅ Loading states
- ✅ Error handling com toast notifications

**Hooks utilizados:**
```typescript
useServicos()           // Lista todos os serviços
useCreateServico()      // Cria novo serviço
useUpdateServico()      // Atualiza serviço
useDeleteServico()      // Deleta serviço
useReorderServicos()    // Reordena serviços
```

---

### **2. Portfolio.tsx**

**Antes:** Usava `useState` com dados locais hardcoded

**Depois:** Integrado com API REST

**Funcionalidades:**
- ✅ Carrega projetos da API
- ✅ Cria novos projetos
- ✅ Edita projetos existentes
- ✅ Deleta projetos
- ✅ Reordena via drag & drop (sincroniza com API)
- ✅ Loading states
- ✅ Error handling com toast notifications
- ✅ Validação de todos os campos obrigatórios

**Hooks utilizados:**
```typescript
useProjetos()           // Lista todos os projetos
useCreateProjeto()      // Cria novo projeto
useUpdateProjeto()      // Atualiza projeto
useDeleteProjeto()      // Deleta projeto
useReorderProjetos()    // Reordena projetos
```

---

### **3. Clientes.tsx**

**Antes:** Usava `useState` com dados importados de arquivo

**Depois:** Integrado com API REST

**Funcionalidades:**
- ✅ Carrega clientes da API
- ✅ Cria novos clientes
- ✅ Edita clientes existentes
- ✅ Deleta clientes
- ✅ Reordena via drag & drop (sincroniza com API)
- ✅ Loading states
- ✅ Error handling com toast notifications
- ✅ Validação de nome único (não permite duplicatas)
- ✅ Preview da logo antes de salvar

**Hooks utilizados:**
```typescript
useClientes()           // Lista todos os clientes
useCreateCliente()      // Cria novo cliente
useUpdateCliente()      // Atualiza cliente
useDeleteCliente()      // Deleta cliente
useReorderClientes()    // Reordena clientes
```

---

## ⚙️ Funcionalidades

### **1. CRUD Completo**

Todas as páginas suportam as 4 operações:

- **Create** (Criar): Botão "Criar novo ..." no modo edição
- **Read** (Ler): Carregamento automático via React Query
- **Update** (Atualizar): Botão de edição em cada item
- **Delete** (Deletar): Botão de exclusão com confirmação

### **2. Drag & Drop com Sincronização**

- Arraste e solte itens para reordenar
- A nova ordem é salva automaticamente na API
- Feedback visual com toast notification

### **3. Loading States**

- Tela de loading enquanto busca dados
- Botões com estado "Salvando..." durante operações
- Botões desabilitados durante requisições

### **4. Error Handling**

- Mensagens de erro claras via toast
- Tratamento de erros de rede
- Validação de campos obrigatórios
- Mensagens específicas (ex: "Cliente já existe")

### **5. React Query Cache**

- Cache inteligente de dados
- Refetch automático após mutações
- Otimização de requisições

---

## 🔧 Como Funciona Internamente

### **Fluxo de Dados**

```
┌─────────────────┐
│  Componente     │
│  (Servicos.tsx) │
└────────┬────────┘
         │
         │ usa hooks
         ▼
┌─────────────────┐
│   useServicos() │ ◄─── React Query
└────────┬────────┘
         │
         │ chama API
         ▼
┌─────────────────┐
│  norselApi.ts   │
└────────┬────────┘
         │
         │ HTTP Request
         ▼
┌─────────────────┐
│   API Backend   │
│ localhost:8000  │
└─────────────────┘
```

### **Exemplo de Uso nos Componentes**

```typescript
// No componente
const { data: servicos, isLoading, error } = useServicos();
const createMutation = useCreateServico();

// Criar novo serviço
const handleCreate = async (data) => {
  try {
    await createMutation.mutateAsync(data);
    toast.success("Serviço criado!");
  } catch (error) {
    toast.error("Erro ao criar serviço");
  }
};
```

---

## 🎯 Tipos TypeScript

### **Servico**

```typescript
interface Servico {
  id: number;
  titulo: string;
  descricao: string;
  caracteristicas: string[];
  imagem?: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}
```

### **Projeto**

```typescript
interface Projeto {
  id: number;
  nome: string;
  local: string;
  ano: string;
  descricao: string;
  imagem: string;
  ordem: number;
  created_at: string;
  updated_at: string;
}
```

### **Cliente**

```typescript
interface Cliente {
  id: number;
  alt: string;        // Nome único
  src: string;        // URL da logo
  title: string;      // Tooltip
  ordem: number;
  created_at: string;
  updated_at: string;
}
```

---

## 🐛 Troubleshooting

### **Erro: "Erro ao carregar serviços"**

**Causa:** API não está rodando

**Solução:**
```bash
cd C:\git\norsel-api
uvicorn app.main:app --reload
```

---

### **Erro: "CORS policy"**

**Causa:** API não está configurada para aceitar requisições do frontend

**Solução:** A API já está configurada com CORS aberto (`allow_origins=["*"]`). Verifique se está usando a porta correta.

---

### **Erro: "Cliente com este nome já existe"**

**Causa:** Tentativa de criar cliente com nome (`alt`) duplicado

**Solução:** Use um nome diferente. O campo `alt` deve ser único.

---

### **Dados não aparecem após criar**

**Causa:** Pode ser problema de cache do React Query

**Solução:** Recarregue a página. O React Query deve invalidar o cache automaticamente, mas às vezes pode haver delay.

---

### **Drag & Drop não salva a ordem**

**Causa:** Erro na API ao reordenar

**Solução:** Verifique o console do navegador e os logs da API. A ordem só é salva quando você solta o item (onDragEnd).

---

## 📚 Documentação Adicional

- **API Backend**: Veja `C:\git\norsel-api\NOVAS_ENTIDADES.md`
- **Quick Start**: Veja `C:\git\norsel-api\QUICK_START.md`
- **Implementação**: Veja `C:\git\norsel-api\README_IMPLEMENTACAO.md`

---

## ✅ Checklist de Verificação

Antes de começar a usar:

- [ ] API rodando em `http://localhost:8000`
- [ ] Banco de dados criado (`python init_db.py`)
- [ ] Dados iniciais populados (opcional: `python seed_new_entities.py`)
- [ ] Frontend rodando (`npm run dev`)
- [ ] Acesso às páginas `/servicos`, `/portfolio`, `/clientes`

---

## 🎨 Diferenças Visuais

**Nenhuma!** A interface continua exatamente igual. A única diferença é que agora os dados vêm da API em vez de serem hardcoded.

**Novos feedbacks:**
- Toast notifications para sucesso/erro
- Loading states visuais
- Botões com estado "Salvando..."

---

## 🔄 Próximos Passos Recomendados

1. **Autenticação**: Implementar login para proteger ações de edição
2. **Upload de Imagens**: Endpoint dedicado para upload de arquivos
3. **Paginação**: Para listas muito grandes
4. **Filtros**: Busca e filtros por categoria/tipo
5. **Logs**: Exibir histórico de mudanças
6. **Validações**: Validações mais complexas (tamanho de imagem, etc.)

---

**✅ Integração 100% Completa!**

Todos os componentes agora usam a API REST para gerenciar dados.
