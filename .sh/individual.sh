npx babel --config-file ./.rc/.babelrc src-individual -d dist-individual --copy-files
npx browserify -p esmify dist-individual/$1.js -o main-individual.jxa
echo done
