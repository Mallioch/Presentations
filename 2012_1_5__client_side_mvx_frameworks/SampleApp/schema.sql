USE SampleQuizCardApp
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Card]') AND type in (N'U'))
	DROP TABLE [dbo].[Card]
GO

CREATE TABLE dbo.[Card](
	CardId INT PRIMARY KEY IDENTITY,
	Recto NVARCHAR(250) NOT NULL,
	Verso NVARCHAR(250) NOT NULL,
	TimesCorrect INT NOT NULL DEFAULT(0),
	TimesIncorrect INT NOT NULL DEFAULT(0),
	IsArchived INT NOT NULL DEFAULT(0)
)

GO

INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'ἀρκέω', 'be enough'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'δειλιάω', 'be afraid'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'διαιρέω', 'divide, distribute, apportion'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'ἐμφανίζω', 'reveal'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'ἐντεῦθεν', 'from here'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'θεῖος, θεία, θεῖον', 'divine; supernatural'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'θεραπεύω', 'serve;heal, restore'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'ἱερατικός, -ή, -όν', 'priestly; devoted to sacred purposes'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'κλῆμα, -ατος, τό', 'branch'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'μονή, -ῆς, ἡ', 'room'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'οἶμαι', 'think, suppose'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'πρόφασις, -εως, ἡ', 'excuse'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'τάγμα, -ατος, τό', 'class, group'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'τάξις, -εως, ἡ', 'fixed success or order; good order; nature, quality'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'τρόπος, -ου, ὁ', 'manner, way, kind; way of life, conduct'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'φυλή, -ῆς, ἡ', 'tribe'
INSERT INTO dbo.[Card] (Recto, Verso) SELECT N'χρηματίζω', 'make known a divine injunction; be called/named, be identified as'


